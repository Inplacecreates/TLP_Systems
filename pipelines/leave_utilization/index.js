// pipelines/leave-utilization/index.js
import { PrismaClient } from '@prisma/client';
import { calculateDays, writeCSV } from './utils.js';

const prisma = new PrismaClient();

async function generateLeaveUtilization() {
  const leaveData = await prisma.leave.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: {
            select: { name: true }
          }
        }
      }
    }
  });

  const userStats = new Map();

  for (const record of leaveData) {
    const days = calculateDays(record.startDate, record.endDate);
    const { id, name, email, role } = record.user;

    if (!userStats.has(id)) {
      userStats.set(id, {
        name,
        email,
        role: role.name,
        totalDays: 0,
        leaveTypes: {}
      });
    }

    const user = userStats.get(id);
    user.totalDays += days;
    user.leaveTypes[record.type] = (user.leaveTypes[record.type] || 0) + days;
  }

  // Prepare data for CSV
  const leaveSummary = [];
  const underUtilized = [];

  for (const [, user] of userStats) {
    const { name, email, role, totalDays, leaveTypes } = user;
    leaveSummary.push({
      Name: name,
      Email: email,
      Role: role,
      'Total Leave (Days)': totalDays,
      ...leaveTypes
    });

    if (totalDays < 5) {
      underUtilized.push({ Name: name, Email: email, Role: role, 'Leave Days': totalDays });
    }
  }

  // Write to CSVs
  await writeCSV('./pipelines/leave-utilization/output/leave_summary.csv', leaveSummary);
  await writeCSV('./pipelines/leave-utilization/output/underutilized_employees.csv', underUtilized);

  console.log('✅ Leave Utilization Summary Generated');
}

generateLeaveUtilization()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
