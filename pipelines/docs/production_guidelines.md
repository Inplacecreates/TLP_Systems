# Production-Grade Code Best Practices

**Owners:** Gauss Analytics Ltd
**Collaborators:** Inplace Creates, The Leo Project
**Last Updated:** 18/05/2025

---

## 1. Data Architecture & Schema Design

### Tools: PostgreSQL, Prisma, dbt

### Standards

#### Analytics-Ready Schemas

- Add `created_at`/`updated_at` timestamps to **all transactional tables**.
- Use **indexes** for frequently filtered/joined fields (e.g., `user_id`, `department_id`).

```sql
-- Example: Composite index for leave requests
CREATE INDEX idx_leave_user_status ON leave_requests (user_id, status);
```

#### Normalization vs. Denormalization**

- Normalize reference tables (e.g., `departments`, `roles`).
- Denormalize **read-heavy aggregates** (e.g., `monthly_spend_summary`).

#### Enums for Fixed Values

```prisma
// In schema.prisma
enum LeaveType {
VACATION
SICK
PATERNITY
}
```

## 2. Pipeline Development

### Tools: Python, FastAPI, dbt, Airflow

#### Principles

- **Modular Code Structure**
- Organize pipelines into reusable components:

```bash
/pipelines/expense-tracking  
├── ingest/  
    └── api_ingest.py      # FastAPI endpoint  
├── transform/  
    └── spend_aggregator.sql  # dbt model  
├── tests/                # pytest scripts  
└── utils/  
    ├── logger.py          # Custom logging  
    └── slack_alert.py     # Alerting module  
```

- **Idempotent Workflows**
- Use SQL ON CONFLICT clauses or Python deduplication logic:

```python
# utils/deduplicate.py  
def deduplicate_records(records: list, key: str) -> list:  
    seen = set()  
    return [r for r in records if not (r[key] in seen or seen.add(r[key]))]
```

- **Configuration Management**
- Store credentials in .env with python-dotenv:

```bash
# .env  
DB_URL=postgresql://user:pass@localhost:5432/enterprise_db  
SLACK_WEBHOOK=https://hooks.slack.com/services/...  
```

- Use dbt profiles.yml for environment-specific connections.

## 3. Testing & Validation

### Tools: pytest, Great Expectations, dbt

### Strategies

- **Unit Tests**

```python
# tests/test_validation.py  
def test_leave_request_validation():  
    valid_data = {"user_id": 101, "days": 3, "type": "VACATION"}  
    assert validate_leave_request(valid_data) == True  
  
    invalid_data = {"user_id": 101, "days": 10}  # Missing 'type'  
    assert validate_leave_request(invalid_data) == False  
```

- **Data Quality Checks**

  - Use `dbt tests` for SQL assertions:

  ```sql
  -- models/schema.yml  
  version: 2  
  models:  
  - name: monthly_spend  
      tests:  
      - not_null:  
          column_name: department_id  
      - relationships:  
          to: ref('departments')  
          field: id  
  ```

- **Integration Testing**

  - Run end-to-end pipeline tests with synthetic data in a staging environment.

## 4. Monitoring & Alerting

### Tools: Prometheus, Grafana, Slack

### Implementation

- **Logging Standards**

```python
# utils/logger.py  
import structlog  
logger = structlog.get_logger()  
logger.info("Ingestion started", pipeline="expense", records=1000)  
```

- **Key Metrics to Track**

| Metric                  | Tool       | Alert Threshold       |
| ----------------------- | ---------- | --------------------- |
| Pipeline runtime        | Prometheus | > 30 mins             |
| Rows ingested/hour      | Grafana    | < 100 (stagnation)    |
| Validation failure rate | Slack      | > 5% of total records |

- **Dashboard Example:**

## 5. Security & Governance

### Tools: PostgreSQL RLS, Vault, Python

### Practices

- **Role-Based Access Control (RBAC)**
  Restrict data access by role (e.g., HR, Finance, Operations):

  ```sql
  -- Restrict salary access to HR  
  CREATE POLICY hr_salary_access ON salaries  
  USING (current_user = 'hr_role');  
  ```

- **Field-Level Redaction**
  Mask sensitive fields in logs, APIs, and dashboards:

  ```python
  # utils/redact.py  
  def redact_sensitive(data: dict, fields: list) -> dict:  
      return {k: "****" if k in fields else v for k, v in data.items()}  
  ```

- **Audit Logging**
  Track changes to critical tables with triggers:

  ```sql
  -- Example: Audit trigger for expenses  
  CREATE TABLE expense_audit (  
      action VARCHAR(10),  
      old_data JSONB,  
      new_data JSONB,  
      changed_by VARCHAR(50),  
      changed_at TIMESTAMP  
  );  

  CREATE TRIGGER log_expense_changes  
  AFTER INSERT OR UPDATE OR DELETE ON expenses  
  FOR EACH ROW EXECUTE FUNCTION audit_trigger();  
  ```

- **Encryption**
  Use `pgcrypto` for encrypting sensitive fields:

  ```sql
  -- Encrypt salary data  
  CREATE EXTENSION pgcrypto;  
  INSERT INTO users (ssn) VALUES (pgp_sym_encrypt('123-45-6789', 'secret_key'));  
  ```

- **Compliance Audits**

  - Schedule quarterly reviews of access controls.
  - Log all data access attempts (e.g., `pgAudit` for PostgreSQL).

## 6. Documentation & Collaboration

### Tools: Swagger, GitHub, Notion

### Documentation Standards

- **API Contracts**
  Document endpoints with Swagger:

  ```yaml
  # swagger.yaml  
  /api/expenses:  
    post:  
      summary: Submit an expense  
      parameters:  
        - name: amount  
          in: body  
          required: true  
          schema:  
            type: number  
  ```

- **PR Templates**

  ```markdown
  ## Changes  
  - [ ] Added tests  
  - [ ] Updated documentation  
  - [ ] Checked data governance impact  
  ```

## 7. Performance & Scaling

### Tools: Docker, Kubernetes, Airflow

### Optimization Strategies

- **Query Optimization**

  - Use `EXPLAIN ANALYZE` to debug slow SQL.
  - Partition large tables by date (e.g., `incidents_2023Q1`).
- **Containerization**

  ```dockerfile
  # Dockerfile for Python pipelines  
  FROM python:3.9-slim  
  COPY requirements.txt .  
  RUN pip install -r requirements.txt  
  CMD ["python", "pipeline.py"]  
  ```

- **Workflow Orchestration**

  Migrate from cron to Airflow for dependency management:

  ```python
  # airflow_dag.py  
  with DAG('expense_pipeline', schedule_interval='@daily') as dag:  
      ingest = PythonOperator(task_id='ingest', python_callable=run_ingestion)  
      validate = PythonOperator(task_id='validate', python_callable=run_validation)  
      ingest >> validate  
  ```

---

## 8. Data Observability

### Tools: Monte Carlo, Lightdash

### Observability Implementation

- **Data Lineage**
  Use `dbt docs generate` to visualize table dependencies.
- **Anomaly Detection**

  ```python
  # utils/anomaly.py  
  from sklearn.ensemble import IsolationForest  
  model = IsolationForest().fit(train_data)  
  anomalies = model.predict(test_data)  
  ```

## 9. Incident Management

### Process

1. **Triage** : Classify severity (e.g., P0: Total pipeline failure).
2. **Rollback** : Restore data from backups if needed.
3. **Post-Mortem** : Document root cause and prevention steps.

## 10. Compliance & Auditing

### Frameworks: The Kenya Data Protection Act, 2019 (DPA)

### Actions

- Encrypt sensitive fields with `pgcrypto`:

  ```sql
  CREATE EXTENSION pgcrypto;  
  INSERT INTO users (ssn) VALUES (pgp_sym_encrypt('123-45-6789', 'secret_key'));  
  ```
  
- Schedule quarterly access control audits.

### **Why This Works**

- **Clarity**: The roadmap stays high-level and actionable for stakeholders.
- **Maintainability**: Code practices are versioned separately, making updates easier.
- **Scalability**: New contributors can find technical guidance without sifting through the roadmap.
- **End-to-End Coverage**: From schema design to compliance.
- **Actionable Examples**: Code snippets, SQL policies, and tool configs.
- **Role Alignment**: Sections map directly to your responsibilities (e.g., governance, dashboards).
- **Scalability Focus**: Docker, Airflow, and Kubernetes guidance.
