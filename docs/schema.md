# 🗃️ TLP Systems App – Database Schema

This document outlines the **logical structure of the PostgreSQL database** used in the TLP Systems App. It supports modular workflows such as leave management, locum invoicing, approvals, incident tracking, finance records, and operational requests.

---

## 🧱 Core Tables

### 1. `Employees`

Stores all registered system users.

| Column         | Type     | Description                         |
|----------------|----------|-------------------------------------|
| `EmployeeID`   | Integer  | Primary key                         |
| `FirstName`    | String   | User’s first name                   |
| `MiddleName`   | String   | User’s middle name                  |
| `LastName`     | String   | User’s last name                    |
| `Email`        | String   | Used for login and notifications    |
| `PhoneNumber`  | String   | Contact info                        |
| `NationalID`   | String   | Government-issued ID                |
| `RoleID`       | Integer  | Foreign key to `Roles`              |
| `Department`   | String   | Department name                     |
| `HireDate`     | Date     | Date joined                         |
| `ContractType` | String   | Permanent, Casual, Locum etc.       |
| `LeaveBalance` | Integer  | Days remaining                      |
| `EmploymentStatus` | String | Active, Suspended, Left           |

---

### 2. `Roles`

Defines system roles with permissions.

| Column      | Type    | Description           |
|-------------|---------|-----------------------|
| `RoleID`    | Integer | Primary key           |
| `RoleName`  | String  | e.g. Admin, Staff     |
| `Permissions` | JSON/Text | Role-specific access |

---

### 3. `LeaveRequests`

Leave applications submitted by employees.

| Column                     | Type     | Description                       |
|----------------------------|----------|-----------------------------------|
| `LeaveRequestID`           | Integer  | Primary key                       |
| `EmployeeID`               | Integer  | Foreign key to `Employees`        |
| `TypeOfLeave`              | String   | Annual, Sick, Emergency, etc.     |
| `StartDate`, `EndDate`     | Date     | Leave duration                    |
| `TotalLeaveDaysRequested`  | Integer  | Total leave days                  |
| `ContactWhileOnLeave`      | Text     | Emergency contact                 |
| `AdditionalNotes`          | Text     | Optional                          |
| `ApproverID`               | Integer  | Employee approving                |
| `OverallStatus`            | String   | Pending, Approved, Rejected       |
| `RequestNumber`            | Integer  | Auto-assigned serial              |
| `CreatedAt`, `UpdatedAt`   | Timestamp | System-generated                  |

---

### 4. `Locums`

Details of all locum workers used during staff absences.

| Column         | Type     | Description                        |
|----------------|----------|------------------------------------|
| `LocumID`      | Integer  | Primary key                        |
| `FirstName`    | String   | Personal name                      |
| `MiddleName`   | String   | Middle name                        |
| `LastName`     | String   | Surname                            |
| `Email`        | String   | For notification & invoices        |
| `PhoneNumber`  | String   | Contact info                       |
| `IDNumber`     | String   | Government ID                      |
| `JobTitle`     | String   | Position or coverage specialty     |
| `BankDetails`  | JSON     | Includes account number, bank code |
| `ApprovalStatus` | String | Active, Inactive, Blacklisted      |
| `Status`       | String   | Available, Busy, On Hold           |

---

### 5. `LocumCovers`

Many-to-many relationship between leave requests and locums.

| Column           | Type    | Description                       |
|------------------|---------|-----------------------------------|
| `CoverID`        | Integer | Primary key                       |
| `LeaveRequestID` | Integer | Foreign key                       |
| `LocumID`        | Integer | Foreign key                       |
| `StartDate`      | Date    | When locum coverage begins        |
| `EndDate`        | Date    | End of coverage                   |
| `TotalDays`      | Integer | Days worked                       |
| `AgreedDailyRate`| Decimal | Rate agreed per day               |
| `InvoiceSubmitted`| Boolean | Has locum submitted invoice?      |
| `ValidationStatus` | String | Validated, Flagged, Rejected      |

---

### 6. `FinanceRecords`

Approved invoices and operational costs tracked here.

| Column        | Type     | Description                        |
|---------------|----------|------------------------------------|
| `FinanceRecordID` | Integer | Primary key                     |
| `EmployeeID`  | Integer  | Linked staff member                |
| `Category`    | String   | Locum, Operational, Misc           |
| `Amount`      | Decimal  | Total cost                         |
| `Date`        | Date     | When payment recorded              |
| `ReceiptURL`  | Text     | Optional attachment                |
| `ApprovalStatus` | String | Approved, Rejected, Flagged       |
| `Notes`       | Text     | Finance remarks                    |
| `BudgetReference` | String | Optional tag                     |

---

### 7. `OperationalRequests`

Tracks resource/equipment requests.

| Column             | Type     | Description                    |
|--------------------|----------|--------------------------------|
| `RequestID`        | Integer  | Primary key                    |
| `OrderingPerson`   | String   | Name of requester              |
| `ItemName`         | String   | What is being requested        |
| `Urgency`          | String   | Low, Medium, High              |
| `DeadlineToPurchase` | Date  | Expected date                  |
| `EstimatedPricePerItem` | Decimal | Price estimate             |
| `EstimatedTotalCost` | Decimal | Total estimate                |
| `DepartmentAttachedTo` | String | Department name              |
| `ReviewerApprover` | String   | Who will review                |
| `ApprovalStatus`   | String   | Pending, Approved, Rejected    |
| `ActualCost`       | Decimal  | Final cost                     |

---

### 8. `IncidentReports`

Log and track workplace incidents.

| Column         | Type     | Description                      |
|----------------|----------|----------------------------------|
| `IncidentID`   | Integer  | Primary key                      |
| `EmployeeID`   | Integer  | Reporter                         |
| `IncidentType` | String   | Safety, HR, Facility, etc.       |
| `Description`  | Text     | Full details                     |
| `DateReported` | Date     | When it occurred                 |
| `Status`       | String   | Open, Resolved, Escalated        |
| `FollowUpActions` | Text  | Steps taken                      |

---

### 9. `Approvals`

Tracks multi-step approvals across modules.

| Column         | Type     | Description                      |
|----------------|----------|----------------------------------|
| `ApprovalID`   | Integer  | Primary key                      |
| `RequestID`    | Integer  | Linked to Leave/Ops/Finance      |
| `RequestType`  | String   | Leave, Operational, etc.         |
| `ApproverID`   | Integer  | Who is assigned                  |
| `ApprovalStatus` | String | Pending, Approved, Rejected      |
| `ApprovalDate` | Date     | When reviewed                    |
| `Comments`     | Text     | Reviewer notes                   |

---

### 10. `Notifications`

| Column         | Type     | Description                      |
|----------------|----------|----------------------------------|
| `NotificationID` | Integer | Primary key                    |
| `EmployeeID`   | Integer  | Recipient                       |
| `Message`      | Text     | Notification content             |
| `NotificationType` | String | Info, Warning, Action         |
| `DateSent`     | Date     | Timestamp                        |
| `ReadStatus`   | Boolean  | Seen/unseen                      |

---

### 11. `AuditLogs`

| Column        | Type     | Description                      |
|---------------|----------|----------------------------------|
| `LogID`       | Integer  | Primary key                      |
| `EmployeeID`  | Integer  | Who triggered the action         |
| `Action`      | String   | Description of action            |
| `ActionType`  | String   | Submit, Approve, Edit, etc.      |
| `Timestamp`   | DateTime | System time                      |
| `AffectedTable` | String | Which table was touched         |
| `Details`     | Text     | Optional JSON or text            |

---

## 🔐 Relationships (Foreign Keys)

- `LeaveRequests.EmployeeID` → `Employees.EmployeeID`
- `LocumCovers.LocumID` → `Locums.LocumID`
- `LocumCovers.LeaveRequestID` → `LeaveRequests.LeaveRequestID`
- `FinanceRecords.EmployeeID` → `Employees.EmployeeID`
- `Approvals.ApproverID` → `Employees.EmployeeID`
- `Notifications.EmployeeID` → `Employees.EmployeeID`
- `AuditLogs.EmployeeID` → `Employees.EmployeeID`

---

## 📌 Notes

- Tables are normalized to avoid data duplication.
- Prisma migrations maintain schema version control.
- Each workflow module maps directly to its primary table(s).
- Schema designed for easy migration to Google Cloud SQL or any hosted PostgreSQL instance.
