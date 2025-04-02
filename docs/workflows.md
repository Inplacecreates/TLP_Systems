# 🔁 TLP Systems App – Workflow Documentation

This document outlines the core **business workflows** implemented within the TLP Systems App. These flows are built with a combination of forms, logic validation, approvals, email notifications, and logging.

Each workflow is modular and mapped to specific user roles and tables.

---

## 1. 📅 Leave & Locum Workflow

### 👤 Actors:
- Employee
- Manager
- Locum
- Finance
- System (Notification + Audit)

### 🧭 Flow Steps:
1. **Employee submits leave request** via frontend form.
2. **Locum(s) assigned** in same form → optional: up to 4 locums.
3. Request is saved as `Pending Approval`.
4. **Manager receives notification** and opens approval interface.
5. Upon **approval**:
   - Locum(s) receive automatic email with coverage dates.
   - Request status becomes `Approved`.
6. After leave ends:
   - **System triggers an email** to locum with an invoice form link.
7. **Locum submits invoice**.
8. **System auto-validates invoice** (matching dates, daily rate).
9. If **valid**, it's sent to Finance for payment review.
10. If **invalid**, the approver is notified for manual review.
11. **Finance approves or rejects invoice**.
12. Final status and audit record are updated.

---

## 2. 🧾 Finance Record Workflow

### 👤 Actors:
- Locum
- Finance
- Admin

### 🧭 Flow Steps:
1. Validated invoices or approved requests result in **Finance Record creation**.
2. Finance team:
   - Adds actual cost
   - Links to category (`Locum`, `Operational`, `Misc`)
   - Uploads receipt if needed
3. Record is stored in `FinanceRecords` table.
4. Monthly data is used in **budget analysis dashboards**.

---

## 3. 📦 Operational Request Workflow

### 👤 Actors:
- Employee
- Manager
- Finance

### 🧭 Flow Steps:
1. **Employee submits request** with:
   - Item name, urgency, estimated cost
   - Department + approver name
2. Request enters `Pending` state.
3. **Manager reviews** and approves or rejects.
4. If approved, **Finance logs actual cost** and remarks.
5. Record is finalized and can be filtered in dashboards.

---

## 4. ⚠️ Incident Reporting Workflow

### 👤 Actors:
- Employee
- Manager
- Admin

### 🧭 Flow Steps:
1. Employee opens form to **report an incident**.
2. Describes issue, adds attachments (optional).
3. System **notifies manager and admin**.
4. Manager reviews and **adds follow-up actions**.
5. Admin marks as:
   - `Resolved`
   - `Escalated`
   - or `Needs Follow-Up`
6. Audit log updated at each status change.

---

## 5. ✅ Approval Workflow (Universal)

### 👤 Actors:
- Approvers (Manager, Finance, Admin)
- System

### 🧭 Flow Steps:
1. Any form (Leave, Ops, Incident) creates an entry in the `Approvals` table.
2. The approver gets a task notification.
3. Approver logs in → opens task → selects:
   - `Approve`
   - `Reject`
   - `Request More Info`
4. Action triggers downstream flow (e.g., notify locum, unlock finance form).
5. Audit record saved.

---

## 6. 🔔 Notification System

### 📬 Trigger Points:
- Leave submission
- Leave approval
- Locum assignment
- Invoice submission
- Invoice validation results
- Incident report
- Operational request status change

### 🧭 Flow Steps:
1. Triggers are fired from backend services or frontend logic.
2. Notification content is generated per event.
3. Message sent via:
   - Email (SendGrid/SMTP)
   - Optional: in-app notification queue
4. Logged in `Notifications` table with `ReadStatus`

---

## 7. 🧾 Audit Logging Workflow

### 📜 Logged Events:
- Leave request submissions
- Approvals and rejections
- Locum invoice events
- Operational request actions
- Finance updates
- Role changes or user access

### 🧭 Flow Steps:
1. Every significant user/system action is captured.
2. Stored in `AuditLogs` with:
   - Actor
   - Action type
   - Timestamp
   - Related record or table
3. Admin view allows filtering by actor, time, and module.

---

## 🔄 Cross-Module Workflow Logic

| From Module     | To Module       | Trigger Point                          |
|------------------|------------------|----------------------------------------|
| Leave Request     | Locum Assignment | On submission                          |
| Leave Approval    | Locum Notification | On approval                            |
| Leave End         | Invoice Form Trigger | Leave end date reached                 |
| Invoice Submission| Finance Record     | After validation                       |
| Operational Request| Finance Log       | Once request is approved               |

---

## 🧠 Automation Highlights

- ✅ Dynamic locum validation on invoice submission
- ✅ Email notifications based on role and action
- ✅ Audit trail generated for all flows
- ✅ Role-based approval routing

---

For diagrams of these workflows, see:

- 🔁 [Workflow Sequence Diagram](/docs/workflow-sequence.puml)
- 🧱 [Architecture Overview](/docs/architecture.md)