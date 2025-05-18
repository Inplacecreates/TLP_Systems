
# Data Pipeline Documentation

This document outlines the detailed data pipeline architecture and the updated Prisma schema to support sustainable, efficient analytics for the TLP Systems App.

---

## 🌐 1. Data Pipeline Overview

### 1.1 Ingestion Layer

**Purpose:** Capture all operational events and user data in near real-time or batch mode.

| Source               | Mechanism         | Frequency      | Tooling                   |
|----------------------|-------------------|----------------|---------------------------|
| Frontend API         | REST ingestion    | Real-time      | FastAPI / Express + Prisma|
| CSV & File Uploads   | Batch scripts     | On-Demand / Daily | Python scripts           |
| Third-Party APIs     | Scheduled pulls   | Hourly / Daily | Node.js cron + Axios      |

**Key Steps:**

1. API endpoints validate JSON payloads via Pydantic.
2. Batch files are staged, validated, and loaded.
3. Errors logged to `ingestion_errors` table with timestamp and context.

### 1.2 Validation & Cleaning

**Purpose:** Ensure data integrity before transformation.

| Task                 | Description                              | Tooling               |
|----------------------|------------------------------------------|-----------------------|
| Schema Validation    | Enforce field types & enums              | Pydantic / Marshmallow|
| Deduplication        | Remove repeated records                  | SQL / Python Pandas   |
| Null Handling        | Default values & null checks             | dbt models / SQL      |

### 1.3 Transformation & Aggregation

**Purpose:** Build analytics-ready tables and summary views.

| Pipeline             | Output Table / View     | Schedule     | Notes                                    |
|----------------------|-------------------------|--------------|------------------------------------------|
| Leave Summary        | `leave_summary`         | Daily @ 2am  | Aggregates counts, balances, average days|
| Incident Summary     | `incident_summary`      | Weekly Sun @ 3am | Counts by category, resolution time    |
| Expense Analytics    | `expense_summary`       | Monthly 1st@4am | Budget vs. actuals, variance %        |
| Locum Utilization    | `locum_summary`         | Daily @ 1am  | Hours assigned vs. available hours      |

### 1.4 Alerting & Monitoring

**Purpose:** Notify stakeholders of anomalies or SLA breaches.

- **Budget Breach Alerts**: Trigger email via SendGrid when `expense_summary.variance > 10%`.
- **Incident Overdue**: Notify managers if any `incident` status not resolved within SLA.
- **Ingestion Failures**: Daily summary email of ingestion errors.

### 1.5 Sustainability & Efficiency Metrics

**Purpose:** Track resource usage and environmental impact.

| Metric                   | Data Source          | Calculation                                     |
|--------------------------|----------------------|--------------------------------------------------|
| Carbon Footprint Proxy   | Electricity invoices | kWh × emission factor                            |
| Paper Usage              | Print logs           | Pages printed × paper weight                     |
| Device Utilization       | AuditLog             | Active sessions per device                       |

---
