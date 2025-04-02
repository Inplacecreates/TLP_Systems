# 🏗️ TLP Systems App – Architecture Overview

This document outlines the **technical architecture** of the **TLP Systems App**, a full-stack custom application designed to streamline operations for The Leo Project. It provides insight into how different layers of the system interact and what technologies power each module.

---

## 📐 System Layers

The system follows a classic **3-tier architecture**:

1. **Frontend** – User interface (React + Next.js)
2. **Backend** – API layer and business logic (Node.js + Express)
3. **Database** – Relational data model (PostgreSQL via Prisma ORM)

---

## 🧱 Stack Overview

| Layer         | Technology              | Purpose                                  |
|--------------|--------------------------|------------------------------------------|
| Frontend      | React.js + Next.js       | Build views, dashboards, forms, UX flows |
| Styling       | Tailwind CSS             | Clean, responsive UI design              |
| Backend       | Express.js (Node.js)     | API endpoints, business rules            |
| ORM           | Prisma                   | Database abstraction + migrations        |
| Database      | PostgreSQL               | Primary data store                       |
| Notifications | SendGrid / SMTP          | Trigger email alerts                     |
| Auth & Roles  | Custom RBAC              | Control access per module/role           |
| Hosting       | GCP / Vercel / Railway   | Dev + production environments            |

---

## 📂 Folder Structure

---

## 🧭 Module Map

### ✅ Leave Management
- Submit leave → Assign locum → Notify → Approve → Trigger invoice
- Key Tables: `LeaveRequests`, `LocumCovers`, `Approvals`

### 🧾 Locum Invoicing
- Post-leave, locum submits invoice → System auto-validates → Finance review
- Key Tables: `Locums`, `Invoices`, `FinanceRecords`

### 📦 Operational Requests
- Submit request → Manager approves → Finance logs actual cost
- Key Tables: `OperationalRequests`, `Approvals`, `FinanceRecords`

### ⚠️ Incident Reports
- Staff logs incident → Manager adds follow-up → Admin resolution
- Key Table: `IncidentReports`

### 💰 Finance Records
- All approved invoices and costs are tracked here for reporting and budgeting
- Key Table: `FinanceRecords`

### 🔔 Notifications & Logs
- All key actions trigger role-based email notifications and logs
- Key Tables: `Notifications`, `AuditLogs`

---

## 🧩 API & Integration Points

- `/api/leave`
- `/api/locum/invoice`
- `/api/ops/request`
- `/api/incident`
- `/api/approvals`
- Email triggers via SendGrid (or SMTP server)
- Optional integration with Google Workspace (Docs, Sheets, Calendar)

---

## 🔐 Role-Based Access Control

| Role      | Access Capabilities                              |
|-----------|---------------------------------------------------|
| Staff     | Submit requests, view own records                |
| Manager   | Approve leave, ops, incidents in their unit      |
| Finance   | View, approve, and track finance-related actions |
| Admin     | System-wide access, audit logs, role config      |
| Locum     | Submit invoice (external access form/email)      |

---

## 📊 Dashboards

Each user role sees a different **dashboard view**, rendered on login:

- **Staff Dashboard**: leave status, personal requests, submission shortcuts
- **Manager Dashboard**: pending approvals, department activity, ops
- **Finance Dashboard**: invoices, payments, budget vs actuals
- **Admin Panel**: access control, logs, data summaries

---

## 🗂️ Database Schema Reference

The app follows a **relational model** with foreign key constraints.

- See `docs/dbdiagram-schema.txt` or [dbdiagram.io](https://dbdiagram.io) for a visual ERD.
- Data is normalized into key tables and lookup references.

---

## 📎 Future-Proofing & Scaling

- 📈 Easily extendable modules (training, HR, procurement, etc.)
- 📊 Google BigQuery or Looker Studio for analytics integration
- ☁️ Google Cloud SQL and GKE (containerized backend)
- 🔒 Built-in auditing, permissions, and modular logic per feature

---

## 🧪 Testing Strategy

- Unit tests on service and controller logic (Jest or Mocha)
- API testing with Postman or Thunder Client
- E2E testing (Playwright/Cypress) planned
- Manual QA using sample data across modules

---

## 🧠 Diagram Links

- 📐 System Architecture → `/docs/system-architecture.puml`
- 🔁 Workflow Sequence → `/docs/workflow-sequence.puml`
- 🧱 Database Schema → `/docs/dbdiagram-schema.txt`
- 🎯 User Stories & Sprints → `/docs/planning.md`

---

Built with intention, scaled with integrity, and refined through real use.  
_This system reflects how people work—and improves how they collaborate._