import bcrypt from 'bcryptjs';
import { prisma } from '../db/index.js';

// Check if we're being run directly or via the prisma seed command
const isSeedingDirectly = process.argv[1].includes('seed.js');

async function cleanDatabase() {
  // Use Prisma to clear all tables in correct order to avoid foreign key constraints
  console.log('Cleaning up existing data...');

  const tables = [
    'approval',
    'financeRecord',
    'invoice',
    'locumShift',
    'leave',
    'incident',
    'operationRequest',
    'user',
    'department'
  ];

  // Delete in reverse order of dependencies
  for (const table of tables) {
    try {
      const deleteResult = await prisma[table].deleteMany();
      console.log(`Deleted ${deleteResult.count} records from ${table} table`);
    } catch (error) {
      // Table might not exist or might be empty, log but continue
      console.warn(`Warning: Could not delete from ${table} table:`, error.message);
    }
  }

  console.log('Database cleaned successfully');
}

async function main() {
  try {
    // Clean the database first instead of dropping and recreating
    await cleanDatabase();

    // Create departments first
    const departments = [
      { name: 'Management', description: 'Executive management team', budgetCode: 'MGT-001' },
      { name: 'HR', description: 'Human Resources department', budgetCode: 'HR-001' },
      { name: 'Finance', description: 'Finance department', budgetCode: 'FIN-001' },
      { name: 'Operations', description: 'Operations department', budgetCode: 'OPS-001' },
      { name: 'IT', description: 'Information Technology department', budgetCode: 'IT-001' }
    ];

    const createdDepartments = {};

    for (const dept of departments) {
      const department = await prisma.department.create({
        data: {
          name: dept.name,
          description: dept.description,
          budgetCode: dept.budgetCode
        }
      });
      createdDepartments[dept.name] = department;
    }

    console.log('Created departments');

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: 'admin@tlpsystems.com',
        password: await bcrypt.hash('Admin@123', 10),
        firstName: 'System',
        lastName: 'Administrator',
        role: 'ADMIN',
        contactNumber: '+1234567890',
        address: '123 Admin Street, TLP City',
        department: {
          connect: { id: createdDepartments['Management'].id }
        }
      },
    });

    // Update Management department to have admin as manager
    await prisma.department.update({
      where: { id: createdDepartments['Management'].id },
      data: { manager: { connect: { id: admin.id } } }
    });

    console.log('Created admin user:', admin.email);

    // Create department heads
    const departmentHeads = {};

    for (const [deptName, dept] of Object.entries(createdDepartments)) {
      let role = 'MANAGER';
      if (deptName === 'HR') role = 'HR';
      if (deptName === 'Finance') role = 'FINANCE';

      const head = await prisma.user.create({
        data: {
          email: `${deptName.toLowerCase()}head@tlpsystems.com`,
          password: await bcrypt.hash('Head@123', 10),
          firstName: deptName,
          lastName: 'Head',
          role: role,
          contactNumber: `+1987${Math.floor(1000 + Math.random() * 9000)}`,
          address: `${Math.floor(100 + Math.random() * 900)} ${deptName} Avenue, TLP City`,
          department: {
            connect: { id: dept.id }
          }
        }
      });

      departmentHeads[deptName] = head;

      // Update department to have this user as manager if not Management
      if (deptName !== 'Management') {
        await prisma.department.update({
          where: { id: dept.id },
          data: { manager: { connect: { id: head.id } } }
        });
      }
    }

    console.log('Created department heads');

    // Create regular employees (3 per department)
    const employees = [];
    for (const [deptName, dept] of Object.entries(createdDepartments)) {
      for (let i = 1; i <= 3; i++) {
        const employee = await prisma.user.create({
          data: {
            email: `${deptName.toLowerCase()}emp${i}@tlpsystems.com`,
            password: await bcrypt.hash('Employee@123', 10),
            firstName: `${deptName}`,
            lastName: `Employee ${i}`,
            role: 'EMPLOYEE',
            contactNumber: `+1555${Math.floor(1000 + Math.random() * 9000)}`,
            address: `${Math.floor(100 + Math.random() * 900)} Employee Street, TLP City`,
            department: {
              connect: { id: dept.id }
            }
          }
        });
        employees.push(employee);
      }
    }

    console.log('Created regular employees');

    // Create locums (specialized users for stand-in coverage)
    const locums = [];
    for (let i = 1; i <= 3; i++) {
      const locum = await prisma.user.create({
        data: {
          email: `locum${i}@tlpsystems.com`,
          password: await bcrypt.hash('Locum@123', 10),
          firstName: 'Locum',
          lastName: `Provider ${i}`,
          role: 'LOCUM',
          contactNumber: `+1666${Math.floor(1000 + Math.random() * 9000)}`,
          address: `${Math.floor(100 + Math.random() * 900)} Locum Street, TLP City`,
          department: {
            connect: { id: createdDepartments['HR'].id } // Assign locums to HR department
          }
        }
      });
      locums.push(locum);
    }

    console.log('Created locum users');

    // Create test users
    await prisma.user.create({
      data: {
        email: 'user@test.com',
        password: await bcrypt.hash('user123', 10),
        firstName: 'Regular',
        lastName: 'User',
        role: 'EMPLOYEE',
        contactNumber: '+19876543210',
        address: '456 Test Avenue, TLP City',
        department: {
          connect: { id: createdDepartments['Operations'].id }
        }
      },
    });

    // Create test supervisor user
    await prisma.user.create({
      data: {
        email: 'supervisor@test.com',
        password: await bcrypt.hash('super123', 10),
        firstName: 'Supervisor',
        lastName: 'User',
        role: 'MANAGER',
        contactNumber: '+18765432109',
        address: '789 Manager Road, TLP City',
        department: {
          connect: { id: createdDepartments['IT'].id }
        }
      },
    });

    console.log('Test users created successfully');

    // Create sample leave requests
    const leaveTypes = ['ANNUAL', 'SICK', 'COMPASSIONATE', 'MATERNITY', 'PATERNITY', 'UNPAID'];
    const leaveStatuses = ['PENDING', 'APPROVED', 'REJECTED', 'COMPLETED'];

    const createdLeaves = [];

    for (const employee of employees) {
      const numLeaves = Math.floor(Math.random() * 3) + 1; // 1-3 leaves per employee
      for (let i = 0; i < numLeaves; i++) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30));
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 5) + 1);

        const status = leaveStatuses[Math.floor(Math.random() * leaveStatuses.length)];
        const leaveType = leaveTypes[Math.floor(Math.random() * leaveTypes.length)];

        // Assign a stand-in for some leaves
        let standInId = null;
        if (Math.random() > 0.6) { // 40% chance of having a stand-in
          standInId = locums[Math.floor(Math.random() * locums.length)].id;
        }

        const leave = await prisma.leave.create({
          data: {
            userId: employee.id,
            startDate,
            endDate,
            type: leaveType,
            reason: `Sample ${leaveType.toLowerCase()} leave request`,
            status: status,
            standInId: standInId,
            statusHistory: JSON.stringify([
              { status: 'PENDING', timestamp: new Date(Date.now() - 1000000).toISOString() },
              { status: status, timestamp: new Date().toISOString() }
            ])
          }
        });

        createdLeaves.push(leave);

        // Find the department name for this employee (needed for approvals and finance records)
        const employeeDept = Object.values(createdDepartments).find(dept => dept.id === employee.departmentId);
        const deptName = Object.keys(createdDepartments).find(key => createdDepartments[key].id === employee.departmentId);

        // Create approval records for this leave
        if (status !== 'PENDING') {
          const managerApproval = await prisma.approval.create({
            data: {
              approverId: departmentHeads[deptName].id,
              approvalLevel: 'LINE_MANAGER',
              action: status === 'APPROVED' ? 'APPROVE' : 'REJECT',
              status: status === 'PENDING' ? 'PENDING' : 'COMPLETED',
              comments: status === 'APPROVED' ? 'Approved by department head' : 'Rejected due to staffing constraints',
              approvedAt: status === 'PENDING' ? null : new Date(),
              order: 1,
              leaveId: leave.id
            }
          });
        }

        // Create locum shifts for some of the leaves with stand-ins
        if (standInId && (status === 'APPROVED' || status === 'COMPLETED')) {
          const leaveDuration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

          for (let day = 0; day < leaveDuration; day++) {
            const shiftDate = new Date(startDate);
            shiftDate.setDate(startDate.getDate() + day);

            const locumShift = await prisma.locumShift.create({
              data: {
                userId: standInId,
                leaveId: leave.id,
                date: shiftDate,
                hours: 8, // Standard 8-hour shift
                rate: 25.0, // Hourly rate
                status: status === 'COMPLETED' ? 'COMPLETED' : 'APPROVED'
              }
            });

            // Create invoice for completed locum shifts
            if (status === 'COMPLETED') {
              const invoice = await prisma.invoice.create({
                data: {
                  type: 'LOCUM_SHIFT',
                  requesterId: standInId,
                  locumShiftId: locumShift.id,
                  amount: 8 * 25.0, // hours * rate
                  status: Math.random() > 0.3 ? 'APPROVED' : 'PENDING',
                  serviceDate: shiftDate,
                  hoursWorked: 8,
                  hourlyRate: 25.0,
                  description: `Locum coverage for ${employee.firstName} ${employee.lastName}`,
                  leaveType: leaveType,
                  coveragePeriod: `${shiftDate.toISOString().split('T')[0]}`
                }
              });

              // Create finance record for approved invoices
              if (invoice.status === 'APPROVED') {
                await prisma.financeRecord.create({
                  data: {
                    type: 'EXPENSE',
                    category: 'LOCUM_COSTS',
                    amount: invoice.amount,
                    description: `Locum payment for shift on ${shiftDate.toISOString().split('T')[0]}`,
                    date: new Date(),
                    status: 'APPROVED',
                    userId: standInId,
                    leaveId: leave.id,
                    invoiceId: invoice.id,
                    budgetCode: employeeDept.budgetCode,
                    netAmount: invoice.amount
                  }
                });
              }
            }
          }
        }
      }
    }

    console.log('Created sample leave requests and related locum shifts, invoices, and finance records');

    // Create sample incidents
    const severityLevels = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
    const priorityLevels = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];
    const incidentCategories = ['IT', 'SECURITY', 'LOGISTICS', 'FACILITIES', 'HEALTH', 'HR', 'OTHER'];
    const incidentStatuses = ['PENDING', 'APPROVED', 'REJECTED', 'COMPLETED'];

    // Helper function to get department info for an employee
    const getEmployeeDepartmentInfo = (employee) => {
      const deptName = Object.keys(createdDepartments).find(key => createdDepartments[key].id === employee.departmentId);
      const deptInfo = createdDepartments[deptName];
      return { name: deptName, info: deptInfo };
    };

    for (const employee of employees) {
      if (Math.random() > 0.7) { // 30% chance of having reported an incident
        const category = incidentCategories[Math.floor(Math.random() * incidentCategories.length)];
        const severity = severityLevels[Math.floor(Math.random() * severityLevels.length)];
        const priority = priorityLevels[Math.floor(Math.random() * priorityLevels.length)];
        const status = incidentStatuses[Math.floor(Math.random() * incidentStatuses.length)];

        const employeeDept = getEmployeeDepartmentInfo(employee);

        // Assign to someone (often from IT for technical issues)
        const assignedTo = category === 'IT'
          ? departmentHeads['IT'].id
          : (Math.random() > 0.7 ? departmentHeads[employeeDept.name].id : null);

        // Determine if escalated
        const escalated = severity === 'CRITICAL' || (severity === 'HIGH' && Math.random() > 0.7);
        const escalatedTo = escalated ? admin.id : null;

        const incident = await prisma.incident.create({
          data: {
            userId: employee.id,
            title: `${category} Incident - ${severity} Severity`,
            description: `This is a sample ${category.toLowerCase()} incident with ${severity.toLowerCase()} severity and ${priority.toLowerCase()} priority`,
            category: category,
            severity: severity,
            priority: priority,
            status: status,
            assignedTo: assignedTo,
            assignedAt: assignedTo ? new Date() : null,
            resolvedAt: status === 'COMPLETED' ? new Date() : null,
            location: `${employeeDept.name} Department, Main Office`,
            affectedSystems: category === 'IT' ? ['Email', 'ERP System'] : ['Facility Access', 'Office Equipment'],
            serviceInterrupted: severity === 'CRITICAL' || severity === 'HIGH',
            escalated: escalated,
            escalatedTo: escalatedTo,
            escalatedAt: escalated ? new Date() : null,
            followUpRequired: status === 'COMPLETED' && Math.random() > 0.5
          }
        });

        // Create approval for the incident if needed
        if (status !== 'PENDING' && (severity === 'HIGH' || severity === 'CRITICAL')) {
          await prisma.approval.create({
            data: {
              approverId: assignedTo || departmentHeads[employeeDept.name].id,
              approvalLevel: 'LINE_MANAGER',
              action: status === 'APPROVED' || status === 'COMPLETED' ? 'APPROVE' : 'REJECT',
              status: status === 'PENDING' ? 'PENDING' : 'COMPLETED',
              comments: `Incident ${status.toLowerCase()} by department head`,
              approvedAt: status === 'PENDING' ? null : new Date(),
              order: 1,
              incidentId: incident.id
            }
          });

          // For critical incidents, add a finance record for the cost
          if (severity === 'CRITICAL' && (status === 'COMPLETED' || status === 'APPROVED')) {
            const estimatedCost = Math.floor(500 + Math.random() * 5000);

            await prisma.financeRecord.create({
              data: {
                type: 'EXPENSE',
                category: 'INCIDENT_COSTS',
                amount: estimatedCost,
                description: `Emergency response cost for critical incident: ${incident.title}`,
                date: new Date(),
                status: 'APPROVED',
                userId: employee.id,
                incidentId: incident.id,
                budgetCode: employeeDept.info.budgetCode,
                netAmount: estimatedCost
              }
            });
          }
        }
      }
    }

    console.log('Created sample incidents');

    // Create sample operation requests
    const operationTypes = ['PROCUREMENT', 'MAINTENANCE', 'IT_SUPPORT', 'EQUIPMENT', 'FACILITY_REQUEST', 'TRAINING', 'OTHER'];
    const operationStatuses = ['PENDING', 'APPROVED', 'REJECTED', 'COMPLETED'];

    for (const employee of employees) {
      if (Math.random() > 0.5) { // 50% chance of having an operation request
        const type = operationTypes[Math.floor(Math.random() * operationTypes.length)];
        const priority = priorityLevels[Math.floor(Math.random() * priorityLevels.length)];
        const status = operationStatuses[Math.floor(Math.random() * operationStatuses.length)];
        const needsFinance = type === 'PROCUREMENT' || type === 'EQUIPMENT' || Math.random() > 0.7;
        const estimatedCost = needsFinance ? Math.floor(100 + Math.random() * 2000) : null;

        const employeeDept = getEmployeeDepartmentInfo(employee);

        const operation = await prisma.operationRequest.create({
          data: {
            userId: employee.id,
            type: type,
            description: `Sample ${type.toLowerCase().replace('_', ' ')} request`,
            priority: priority,
            status: status,
            estimatedCost: estimatedCost,
            justification: estimatedCost ? `Required for ${employeeDept.name} department operations` : null,
            requiresLineManager: true,
            requiresFinance: needsFinance,
            currentApprovalLevel: status === 'PENDING' ? 'LINE_MANAGER' : (needsFinance ? 'FINANCE_MANAGER' : 'FINAL')
          }
        });

        // Create line manager approval
        if (status !== 'PENDING') {
          await prisma.approval.create({
            data: {
              approverId: departmentHeads[employeeDept.name].id,
              approvalLevel: 'LINE_MANAGER',
              action: status === 'REJECTED' ? 'REJECT' : 'APPROVE',
              status: 'COMPLETED',
              comments: `Operation request ${status.toLowerCase()} by department head`,
              approvedAt: new Date(),
              order: 1,
              operationId: operation.id
            }
          });

          // Add finance approval if needed and not rejected
          if (needsFinance && status !== 'REJECTED' && status !== 'PENDING') {
            await prisma.approval.create({
              data: {
                approverId: departmentHeads['Finance'].id,
                approvalLevel: 'FINANCE_MANAGER',
                action: 'APPROVE',
                status: 'COMPLETED',
                comments: 'Budget approved for this request',
                approvedAt: new Date(),
                order: 2,
                operationId: operation.id
              }
            });

            // Create finance record for approved operations with cost
            if ((status === 'APPROVED' || status === 'COMPLETED') && estimatedCost) {
              await prisma.financeRecord.create({
                data: {
                  type: 'EXPENSE',
                  category: 'OPERATIONAL_COSTS',
                  amount: estimatedCost,
                  description: `Budget allocation for ${type.toLowerCase().replace('_', ' ')}: ${operation.description}`,
                  date: new Date(),
                  status: status,
                  userId: employee.id,
                  operationId: operation.id,
                  budgetCode: employeeDept.info.budgetCode,
                  netAmount: estimatedCost
                }
              });
            }
          }
        }
      }
    }

    console.log('Created sample operation requests');

    // Create sample finance records (independent of other entities)
    const financeCategories = ['PAYROLL', 'OVERHEAD', 'EQUIPMENT', 'TRAINING', 'OTHER'];
    const transactionTypes = ['INCOME', 'EXPENSE', 'TRANSFER', 'ADJUSTMENT'];

    for (let i = 0; i < 10; i++) {
      const category = financeCategories[Math.floor(Math.random() * financeCategories.length)];
      const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
      const amount = Math.floor(500 + Math.random() * 5000);
      const dept = departments[Math.floor(Math.random() * departments.length)];

      await prisma.financeRecord.create({
        data: {
          type: type,
          category: category,
          amount: amount,
          description: `Sample ${category.toLowerCase()} ${type.toLowerCase()}`,
          date: new Date(),
          status: 'APPROVED',
          budgetCode: dept.budgetCode,
          netAmount: amount,
          taxAmount: Math.floor(amount * 0.1) // 10% tax
        }
      });
    }

    console.log('Created sample finance records');

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
