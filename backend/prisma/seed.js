import bcrypt from "bcryptjs";
import { prisma } from "../db/index.js";


async function main() {
  try {
    // Clean up existing data
    await prisma.auditLog.deleteMany();
    await prisma.notification.deleteMany();
    await prisma.approval.deleteMany();
    await prisma.leave.deleteMany();
    await prisma.incident.deleteMany();
    await prisma.operationRequest.deleteMany();
    await prisma.user.deleteMany();

    console.log('Cleaned up existing data');

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: "admin@tlpsystems.com",
        password: await bcrypt.hash("Admin@123", 10),
        firstName: "System",
        lastName: "Administrator",
        role: "ADMIN",
        department: "Management",
        status: "ACTIVE",
        contractType: "PERMANENT",
      },
    });

    console.log('Created admin user:', admin.email);

    // Create department heads
    const departments = ['HR', 'Finance', 'Operations', 'IT', 'Management'];
    const departmentHeads = await Promise.all(
      departments.map(async (dept) => {
        return prisma.user.create({
          data: {
            email: `${dept.toLowerCase()}head@tlpsystems.com`,
            password: await bcrypt.hash("Head@123", 10),
            firstName: dept,
            lastName: "Head",
            role: dept === 'HR' ? 'HR' : (dept === 'Finance' ? 'FINANCE' : 'SUPERVISOR'),
            department: dept,
            status: "ACTIVE",
            contractType: "PERMANENT",
          },
        });
      })
    );

    console.log('Created department heads');

    // Create regular employees (3 per department)
    const employees = [];
    for (const dept of departments) {
      for (let i = 1; i <= 3; i++) {
        const employee = await prisma.user.create({
          data: {
            email: `${dept.toLowerCase()}emp${i}@tlpsystems.com`,
            password: await bcrypt.hash("Employee@123", 10),
            firstName: `${dept}`,
            lastName: `Employee ${i}`,
            role: "EMPLOYEE",
            department: dept,
            status: "ACTIVE",
            contractType: "PERMANENT",
          },
        });
        employees.push(employee);
      }
    }

    console.log('Created regular employees');

    // Create test users
    await prisma.user.create({
      data: {
        email: "user@test.com",
        password: await bcrypt.hash("user123", 10),
        firstName: "Regular",
        lastName: "User",
        role: "EMPLOYEE",
        department: "General",
        status: "ACTIVE",
        contractType: "CONTRACT",
      },
    });

    // Create test supervisor user
    await prisma.user.create({
      data: {
        email: "supervisor@test.com",
        password: await bcrypt.hash("super123", 10),
        firstName: "Supervisor",
        lastName: "User",
        role: "SUPERVISOR",
        department: "General",
        status: "ACTIVE",
        contractType: "PERMANENT",
      },
    });

    console.log("Test users created successfully");

    // Create sample leave requests
    const leaveTypes = ['ANNUAL', 'SICK', 'MATERNITY', 'PATERNITY', 'UNPAID'];
    const leaveStatuses = ['PENDING', 'APPROVED', 'REJECTED'];

    for (const employee of employees) {
      const numLeaves = Math.floor(Math.random() * 3) + 1; // 1-3 leaves per employee
      for (let i = 0; i < numLeaves; i++) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30));
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 5) + 1);

        await prisma.leave.create({
          data: {
            userId: employee.id,
            startDate,
            endDate,
            type: leaveTypes[Math.floor(Math.random() * leaveTypes.length)],
            reason: 'Sample leave request',
            status: leaveStatuses[Math.floor(Math.random() * leaveStatuses.length)]
          }
        });
      }
    }

    console.log('Created sample leave requests');

    // Create sample incidents
    const severityLevels = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
    const incidentStatuses = ['PENDING', 'APPROVED', 'REJECTED', 'COMPLETED'];

    for (const employee of employees) {
      if (Math.random() > 0.7) { // 30% chance of having reported an incident
        await prisma.incident.create({
          data: {
            userId: employee.id,
            title: `Safety Incident Report - ${employee.firstName}`,
            description: 'This is a sample incident report',
            severity: severityLevels[Math.floor(Math.random() * severityLevels.length)],
            status: incidentStatuses[Math.floor(Math.random() * incidentStatuses.length)]
          }
        });
      }
    }

    console.log('Created sample incidents');

    // Create sample operation requests
    const operationTypes = ['MAINTENANCE', 'EQUIPMENT', 'SOFTWARE', 'ACCESS'];
    const operationStatuses = ['PENDING', 'APPROVED', 'REJECTED', 'COMPLETED'];
    const priorityLevels = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

    for (const employee of employees) {
      if (Math.random() > 0.5) { // 50% chance of having an operation request
        await prisma.operationRequest.create({
          data: {
            userId: employee.id,
            requestType: operationTypes[Math.floor(Math.random() * operationTypes.length)],
            description: 'Sample operation request',
            priority: priorityLevels[Math.floor(Math.random() * priorityLevels.length)],
            status: operationStatuses[Math.floor(Math.random() * operationStatuses.length)]
          }
        });
      }
    }

    console.log('Created sample operation requests');

    // Create sample audit logs
    const auditActions = ['USER_CREATED', 'LEAVE_REQUEST', 'INCIDENT_REPORTED', 'OPERATION_REQUEST'];

    for (const action of auditActions) {
      await prisma.auditLog.create({
        data: {
          userId: admin.id,
          action
        }
      });
    }

    console.log('Created sample audit logs');

    console.log('Database seeded successfully!');

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
