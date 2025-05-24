# Data Pipelines Roadmap

**Owners:** Gauss Analytics Ltd  
**Collaborators:** Inplace Creates, The Leo Project  
**Last Updated:** 18/05/2025

---

## Sprint 0 – Preparation & Design (Completed)  

**Duration:** 1 Week  

### ✅ Completed Deliverables  

| Task | Owner | Details |  
|------|-------|---------|  
| Prisma Schema Finalized | Elvis (Backend) | Includes users, roles, expenses, leave apps, and audit logs |  
| Repository Setup | Team | Folder structure for `/pipelines`, `prisma/schema.prisma` |  
| Data Pipeline Architecture Diagram | Kelvin (Frontend) | Covers ingestion, transformation, and dashboard layers |  
| Data Governance Baseline | Moffat (Data Science) | Defined access controls and redaction rules |  

---

## Sprint 1 – Ingestion & Validation Pipelines (Current Sprint)  

**Duration:** 1 Week  

### 🎯 Sprint 1 Objectives  

1. Build ingestion pipelines for critical datasets.  
2. Implement validation, error logging, and governance.  

### Sprint 1 Tasks  

| Task | Owner | Tools | Acceptance Criteria |  
|------|-------|-------|--------------------|  
| Expense Data Ingestion | Moffat | Python, FastAPI | API + CSV batch support |  
| Schema Validation | Elvis | Pydantic | 100% validation against Prisma schema |  
| Error Dashboard Setup | Kelvin | Power BI | Real-time success/failure rates |  
| Field-Level Redaction | Moffat | PostgreSQL RLS | Mask sensitive fields in logs |  

### Sprint 1 Deliverables  

- `/pipelines/expense-ingestion` directory with scripts  
- Daily ingestion logs (`output/ingestion_logs.csv`)  
- Redaction implementation in audit tables  

---

## Sprint 2 – Transformation & Dashboards (Upcoming)  

**Duration:** 1 Week  

### 🎯 Sprint 2 Objectives  

1. Transform raw data into analytics-ready formats.  
2. Launch operational and financial dashboards.  

### Sprint 2 Tasks  

| Task | Owner | Tools |  
|------|-------|-------|  
| Build Metrics Table | Moffat | dbt, SQL |  
| "Monthly Spend vs. Budget" Dashboard | Kelvin | Power BI |  
| Document Metric Definitions | Team | METRICS.md |  

### Sprint 2 Deliverables  

- 3 dbt transformation scripts  
- Dashboard MVP (Finance + Operations)  
- Standardized metric definitions  

---

## Sprint 3 – Alerting & Forecasting (Future)  

**Duration:** 1 Week  

### 🎯 Sprint 3 Objectives  

1. Proactive monitoring and forecasting for KPIs.  

### Sprint 3 Tasks  

| Task | Owner | Tools |  
|------|-------|-------|  
| Anomaly Detection Pipeline | Moffat | Python, Prophet |  
| Slack Alerts for Budget Breaches | Elvis | Slack API |  
| Expense Trend Forecasting | Team | Statsmodels |  

### Sprint 3 Deliverables  

- `/pipelines/anomaly-detection` directory  
- Daily alert summaries (`output/alerts.csv`)  
- Time-series forecast model  

---

## Sprint 4 – Sustainability & Expansion (Future)  

**Duration:** Ongoing  

### 🎯 Sprint 4 Objectives  

1. Track sustainability metrics and scale pipelines.  

### Sprint 4 Tasks  

| Task | Owner | Tools |  
|------|-------|-------|  
| Carbon Usage Modeling | Moffat | dbt, Python |  
| Electricity API Integration | Team | FastAPI |  
| Quarterly Access Control Audit | Moffat | PostgreSQL RLS |  

### Sprint 4 Deliverables  

- Sustainability dashboard (Power BI)  
- Policy recommendation report  

---

## Role Alignment  

| Role | Key Responsibilities | Sprint Mapping |  
|------|----------------------|----------------|  
| **Data Scientist** | Schema reviews, metric definitions, anomaly detection | Sprints 0,2,3,4 |  
| **Backend Team** | Prisma schema, API integrations | Sprints 0,1 |  
| **Frontend Team** | Dashboard embedding, UI/UX | Sprints 2,3 |  
| **DevOps** | CI/CD, containerization | Sprints 1,4 |  

---

## Production-Grade Standards  

**Refer to:** [`production_guidelines.md`](./production_guidelines.md) for:  

- Error handling & logging examples  
- Configuration management  
- Testing strategies  
- Security practices  

---

## Monitoring & Scaling  

| Area | Approach |  
|------|----------|  
| Scheduling | Cron → Airflow (Sprint 4) |  
| Monitoring | Prometheus + Grafana |  
| Scaling | Docker/Kubernetes |  
| Security | `pgcrypto` for encryption |  

---

## Next Actions  

1. Finalize expense ingestion scripts by 21/05/2025.  
2. Coordinate dashboard integration with Kelvin.
