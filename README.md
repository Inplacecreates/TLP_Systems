# 🚀 TLP Systems App

> A comprehensive enterprise platform powering The Leo Project's internal operations with enhanced leave management, LOCUM coordination, financial tracking, and incident reporting

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.2-blue)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0-purple)](https://www.prisma.io/)

## 📑 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Data Pipeline](#data-pipeline)
- [Testing](#testing)
- [Contributing](#contributing)
- [Version Control](#version-control)
- [Documentation](#documentation)
  - [Setup & Prerequisites](./docs/setup.md)
  - [Database Schema](./docs/schema.md)
  - [Workflow Documentation](./docs/workflows.md)
  - [System Architecture](./docs/architecture.md)
  - [Environment Variables](./docs/env.md)
  - [API Documentation](./docs/api.md)
  - [Development Guide](./docs/development.md)
  - [Testing Guide](./docs/testing.md)
- [Team](#team)
- [License](#license)

## 🌟 Overview

The **TLP Systems App** is a comprehensive enterprise platform that streamlines critical business operations through integrated modules. Built with modern web technologies and a robust database schema, our system delivers:

- 🌴 **Advanced Leave Management** with LOCUM stand-in coordination
- 👥 **Intelligent Locum Assignment** with automated invoicing
- 💰 **Comprehensive Finance Tracking** with budget analysis
- 📦 **Operational Request Management** with multi-level approvals
- ⚠️ **Enterprise Incident Reporting** with service interruption tracking
- ✅ **Multi-step Approval Workflows** with delegation and escalation
- 🏢 **Departmental Hierarchy Management** with line manager assignments
- 📊 **Data Pipeline & Analytics** for operational insights
- 🔔 **Smart Notifications** with role-based delivery

## 🎯 Key Features

### 🌴 Leave + LOCUM Management

- **Integrated Leave Requests** with automatic LOCUM assignments
- **Stand-in Coverage Tracking** linking leave applicants to LOCUM providers
- **Shift Management** with hours tracking and rate calculations
- **Automated Invoicing** for LOCUM services with multiple invoice types
- **Leave History & Status Tracking** with comprehensive audit trails

### 💰 Finance & Budget Operations

- **Multi-Category Finance Records** (Payroll, LOCUM costs, Operational, Incident costs)
- **Transaction Management** (Income, Expense, Transfer, Refund, Adjustment)
- **Budget Code Tracking** with departmental allocation
- **Invoice Processing** with flexible types (Service fees, Overtime, Consulting)
- **Cost Center Management** with real-time budget monitoring

### 🏢 Departmental Structure

- **Hierarchical Department Management** with clear reporting lines
- **Line Manager Assignments** with unique department leadership
- **Role-Based Access Control** (Admin, Manager, Employee, Finance, HR, LOCUM)
- **Cross-departmental Coordination** for resource sharing

### 📦 Operations Hub

- **Comprehensive Request Types** (Procurement, Maintenance, IT Support, HR, Facilities, Training)
- **Cost Estimation & Tracking** with budget impact analysis
- **Multi-level Approval Chains** with configurable workflows
- **Priority-based Processing** with urgency escalation

### ⚠️ Advanced Incident Management

- **Categorized Incident Reporting** (IT, Security, Logistics, Facilities, Health, HR)
- **Service Interruption Tracking** with downtime monitoring
- **Assignment & Escalation Workflows** with reporter-driven assignment
- **Financial Impact Assessment** with cost tracking
- **Root Cause Analysis** with preventive measures documentation

### ✅ Sophisticated Approval System

- **Multi-level Approval Chains** (Line Manager, Finance Manager, Admin, Final)
- **Delegation & Escalation Support** with reason tracking
- **Action-based Workflows** (Approve, Reject, Request Changes, Delegate, Escalate)
- **Threshold-based Approvals** with financial and urgency considerations
- **Comprehensive Audit Trail** with approval history

### 📊 Data Analytics & Pipeline

- **Leave Utilization Analytics** with trend analysis
- **Operational Dashboards** with real-time metrics
- **Data Transformation Pipelines** for business intelligence
- **Performance Monitoring** with key metrics tracking

## 🛠️ Tech Stack

| Layer        | Technology                    | Purpose                               |
|--------------|------------------------------|---------------------------------------|
| **Frontend** | React.js 19.0, Next.js 15.2 | Modern UI Framework & SSR             |
|             | TypeScript                   | Type Safety & Developer Experience   |
|             | Tailwind CSS v4              | Utility-First Styling Framework      |
| **Backend**  | Node.js 18+, Express.js     | Server Runtime & RESTful API         |
|             | ES Modules                   | Modern JavaScript Module System      |
| **Database** | PostgreSQL                  | Primary Relational Database          |
|             | Prisma ORM 5.0               | Type-Safe Database Interface         |
|             | Database Indexing            | Optimized Query Performance          |
| **Auth**     | Custom RBAC                 | Role-Based Access Control            |
|             | JWT & bcryptjs               | Secure Authentication Services       |
| **API**      | Swagger/OpenAPI             | API Documentation & Testing          |
|             | Express Rate Limiting        | API Security & Throttling            |
| **Testing**  | Jest 29+                    | Unit & Integration Testing           |
|             | Supertest                    | API Endpoint Testing                 |
|             | Jest Environment Node        | Node.js Testing Environment          |
| **DevTools** | ESLint, Prettier           | Code Quality & Formatting            |
|             | Nodemon                     | Development Server Auto-Reload       |
| **CI/CD**    | GitHub Actions              | Continuous Integration Pipeline       |
| **Analytics**| Data Pipelines              | Leave Utilization & Business Intelligence |
|             | Custom Analytics Engine      | Operational Metrics & Dashboards     |

## ⚡ Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/inplacecreates/TLP_Systems.git
   cd TLP_Systems
   ```

2. **Set up environment variables**

   ```bash
   # Backend
   cd backend
   cp .env.example .env
   # Edit .env with your configuration

   # Frontend
   cd ../frontend
   cp .env.example .env.local
   # Edit .env.local with your configuration
   
   # Pipelines (optional)
   cd ../pipelines
   cp .env.example .env
   # Edit .env with your pipeline configuration
   ```

3. **Install dependencies**

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   
   # Pipelines
   cd ../pipelines
   npm install
   ```

4. **Set up the database**

   ```bash
   cd ../backend
   npm run db:setup
   npm run seed
   ```

5. **Start development servers**

   ```bash
   # Backend (in one terminal)
   cd backend
   npm run dev

   # Frontend (in another terminal)
   cd frontend
   npm run dev
   ```

6. **Stay up to date with main branch**

   ```bash
   # Regularly pull changes from main branch
   git pull origin main
   ```

## 📊 Data Pipeline

The TLP Systems includes a comprehensive data pipeline for analytics and business intelligence:

### Pipeline Components

- **Leave Utilization Analytics** - Track leave patterns and trends
- **Data Ingestion** - Automated data collection from core systems
- **Data Transformation** - Clean and process data for analysis
- **Dashboard Generation** - Real-time operational dashboards
- **Data Cleaning** - Ensure data quality and consistency

### Pipeline Configuration

```yaml
# pipelines/pipelines_config.yaml
leave_utilization:
  enabled: true
  schedule: daily
  output_format: json
```

### Running Pipelines

```bash
cd pipelines

# Run leave utilization analysis
node leave_utilization/index.js

# View pipeline documentation
cat docs/data-pipeline.md
```

## 🧪 Testing

### Backend Testing

```bash
cd backend

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run tests for CI/CD
npm run test:ci
```

### Test Structure

- **Unit Tests**: Individual component testing
- **Integration Tests**: API endpoint testing
- **Controller Tests**: Business logic validation
- **Helper Tests**: Utility function testing

### Test Coverage

Our testing strategy covers:

- ✅ Authentication & Authorization
- ✅ Leave Management workflows
- ✅ LOCUM shift management
- ✅ Financial operations
- ✅ Incident reporting
- ✅ Approval workflows
- ✅ Admin operations

### Frontend Testing

```bash
cd frontend

# Run component tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📁 Project Structure

```text
TLP_Systems/
├── backend/                    # Node.js Express API Server
│   ├── controllers/           # Request handlers & business logic
│   │   ├── adminController.js     # Admin management operations
│   │   ├── authController.js      # Authentication & authorization
│   │   ├── baseController.js      # Base controller with common methods
│   │   └── employeeController.js  # Employee management operations
│   ├── routes/               # API endpoint definitions
│   │   ├── v1/                   # API version 1 routes
│   │   │   ├── adminRoutes.js       # Admin-specific endpoints
│   │   │   ├── authRoutes.js        # Authentication endpoints
│   │   │   ├── employeeRoutes.js    # Employee endpoints
│   │   │   ├── incidentRoutes.js    # Incident reporting endpoints
│   │   │   ├── leaveRoutes.js       # Leave management endpoints
│   │   │   └── operationRoutes.js   # Operational requests endpoints
│   │   └── index.js              # Route aggregation
│   ├── middleware/           # Custom middleware functions
│   │   ├── auth.js              # Authentication middleware
│   │   └── validator.js         # Request validation middleware
│   ├── prisma/              # Database schema & migrations
│   │   ├── schema.prisma        # Enhanced database schema
│   │   └── seed.js              # Database seeding scripts
│   ├── swagger/             # API documentation
│   │   ├── schemas/             # Swagger schema definitions
│   │   │   ├── admin.js           # Admin API schemas
│   │   │   ├── common.js          # Common/shared schemas
│   │   │   ├── incident.js        # Incident reporting schemas
│   │   │   ├── leave.js           # Leave management schemas
│   │   │   ├── operation.js       # Operations schemas
│   │   │   └── user.js            # User management schemas
│   │   ├── config.js            # Swagger configuration
│   │   └── setup.js             # Swagger setup & initialization
│   ├── test/                # Backend testing suite
│   │   ├── controllers/         # Controller unit tests
│   │   ├── helpers/             # Test helper functions
│   │   └── utils/               # Testing utilities
│   ├── utils/               # Utility functions
│   │   ├── responseHandler.js   # Standardized API responses
│   │   └── rolePermissions.js   # RBAC permission definitions
│   ├── config/              # Application configuration
│   ├── db/                  # Database connection setup
│   └── server.js            # Application entry point
│
├── frontend/                   # Next.js React Application
│   ├── app/                   # Next.js App Router
│   │   ├── globals.css          # Global styles & Tailwind imports
│   │   ├── layout.tsx           # Root layout component
│   │   └── page.tsx             # Homepage component
│   ├── public/               # Static assets
│   └── package.json          # Frontend dependencies
│
├── pipelines/                  # Data Processing & Analytics
│   ├── leave_utilization/     # Leave analytics pipeline
│   │   ├── index.js            # Main pipeline logic
│   │   └── utils.js            # Pipeline utility functions
│   ├── cleaning/             # Data cleaning modules
│   ├── dashboards/           # Dashboard data preparation
│   ├── ingestion/            # Data ingestion pipelines
│   ├── transformation/       # Data transformation logic
│   ├── docs/                 # Pipeline documentation
│   │   ├── data-pipeline.md     # Pipeline architecture
│   │   ├── production_guidelines.md # Production deployment guide
│   │   └── roadmap.md           # Pipeline development roadmap
│   └── pipelines_config.yaml # Pipeline configuration
│
├── docs/                      # Project Documentation
│   ├── api.md                # API endpoint documentation
│   ├── architecture.md       # System architecture overview
│   ├── development.md        # Development guidelines
│   ├── env.md               # Environment configuration guide
│   ├── schema.md            # Database schema documentation
│   ├── setup.md             # Installation & setup guide
│   ├── testing.md           # Testing strategies & guidelines
│   └── workflows.md         # Business process workflows
│
├── .env.example              # Environment variables template
├── README.md                 # Project overview & quick start
└── LICENSE                   # MIT License

```

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** (LTS recommended)
- **PostgreSQL** database server
- **Git** for version control
- **VS Code** (recommended IDE)

### Environment Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/inplacecreates/TLP_Systems.git
   cd TLP_Systems
   ```

2. **Backend Setup**

   ```bash
   cd backend
   
   # Install dependencies
   npm install
   
   # Set up environment variables
   cp .env.example .env
   # Edit .env with your PostgreSQL connection details
   
   # Set up database
   npx prisma generate
   npx prisma migrate dev --name "initial-migration"
   npx prisma db seed
   ```

3. **Frontend Setup**

   ```bash
   cd ../frontend
   
   # Install dependencies
   npm install
   
   # Set up environment variables
   cp .env.example .env.local
   # Configure frontend environment variables
   ```

4. **Data Pipeline Setup (Optional)**

   ```bash
   cd ../pipelines
   
   # Install pipeline dependencies
   npm install
   ```

### Common Commands

### Development Servers

Start the development environment:

```bash
# Backend API Server (Terminal 1)
cd backend
npm run dev
# Server runs on http://localhost:8000


# Frontend Application (Terminal 2)
cd frontend
npm run dev
# Application runs on http://localhost:3000
=======
### Development Environment

#### VS Code Configuration

We recommend using Visual Studio Code with the following extensions:

- ESLint
- Prettier
- Prisma
- Jest
- GitLens
- Tailwind CSS IntelliSense

#### Recommended VS Code Settings

Create a `.vscode/settings.json` file with:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "typescript", "typescriptreact"],
  "prettier.singleQuote": true,
  "prettier.trailingComma": "es5"
}
```

### Troubleshooting

#### Common Issues

1. **Database Connection Problems**
   - Check your PostgreSQL service is running
   - Verify database credentials in `.env`
   - Test connection with `npx prisma db pull`

2. **Node Version Conflicts**
   - Use `nvm use` to switch to the correct version
   - Run `node -v` to verify the active version

3. **Build Errors**
   - Clear cache with `npm cache clean --force`
   - Delete `node_modules` and reinstall dependencies

4. **Merge Conflicts**
   - Always run `git pull origin main` before starting work
   - Use a visual merge tool like VS Code's built-in tool
   - When in doubt, consult with team members


# API Documentation available at:
# http://localhost:8000/api-docs
```

### Database Commands

```bash
# Validate schema
npx prisma validate

# View data in Prisma Studio
npx prisma studio

# Reset database (development only)
npx prisma migrate reset

# Generate Prisma client after schema changes
npx prisma generate
```

## 📝 Version Control

We use Git for version control. Here are some important commands:

```bash
# Clone the repository
git clone https://github.com/Inplacecreates/TLP_Systems.git

# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Keep your branch up to date with main branch
git pull origin main

# Add and commit changes
git add .
git commit -m "Descriptive commit message"

# Push changes to remote repository
git push origin feature/your-feature-name
```

### Branch Management Best Practices

1. **Always keep your branch up to date with main**

   ```bash
   git pull origin main
   ```

   This ensures you're working with the latest code and helps prevent merge conflicts.

2. **Use descriptive branch names**
   - Feature branches: `feature/short-description`
   - Bug fixes: `fix/short-description`
   - Hotfixes: `hotfix/short-description`

3. **Make regular commits with clear messages**
   - Start with a verb (Add, Fix, Update, Refactor)
   - Keep it under 50 characters
   - Use the description for additional details

4. **Clean up branches after merging**

   ```bash
   git branch -d feature/your-feature-name
   ```

## 📡 API Reference

### Core Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| **Authentication** |
| POST | `/api/v1/auth/login` | User authentication | ❌ |
| POST | `/api/v1/auth/register` | User registration | ❌ |
| POST | `/api/v1/auth/logout` | User logout | ✅ |
| GET | `/api/v1/auth/profile` | Get user profile | ✅ |
| **Leave Management** |
| POST | `/api/v1/leave/request` | Submit leave request | ✅ |
| GET | `/api/v1/leave/requests` | Get leave requests | ✅ |
| PATCH | `/api/v1/leave/:id/approve` | Approve/reject leave | ✅ |
| GET | `/api/v1/leave/:id/status` | Get leave status | ✅ |
| **LOCUM & Invoicing** |
| POST | `/api/v1/locum/shift` | Create LOCUM shift | ✅ |
| GET | `/api/v1/locum/shifts` | Get LOCUM shifts | ✅ |
| POST | `/api/v1/invoice/submit` | Submit invoice/reimbursement | ✅ |
| GET | `/api/v1/invoice/list` | List invoices | ✅ |
| **Operations** |
| POST | `/api/v1/operations/request` | Submit operational request | ✅ |
| GET | `/api/v1/operations/requests` | Get operation requests | ✅ |
| PATCH | `/api/v1/operations/:id/approve` | Approve operation request | ✅ |
| **Incidents** |
| POST | `/api/v1/incidents/report` | Report new incident | ✅ |
| GET | `/api/v1/incidents` | Get incidents | ✅ |
| PATCH | `/api/v1/incidents/:id/assign` | Assign incident | ✅ |
| PATCH | `/api/v1/incidents/:id/resolve` | Resolve incident | ✅ |
| **Finance** |
| POST | `/api/v1/finance/record` | Create finance record | ✅ |
| GET | `/api/v1/finance/records` | Get finance records | ✅ |
| GET | `/api/v1/finance/budget/:code` | Get budget by code | ✅ |
| **Approvals** |
| GET | `/api/v1/approvals/pending` | Get pending approvals | ✅ |
| POST | `/api/v1/approvals/:id/action` | Take approval action | ✅ |
| POST | `/api/v1/approvals/:id/delegate` | Delegate approval | ✅ |
| **Admin** |
| GET | `/api/v1/admin/users` | Manage users | ✅ Admin |
| POST | `/api/v1/admin/departments` | Manage departments | ✅ Admin |
| GET | `/api/v1/admin/reports` | System reports | ✅ Admin |

### API Documentation

Interactive API documentation is available at:

- **Development:** `http://localhost:8000/api-docs`
- **Swagger UI** with live testing capabilities
- **Schema definitions** for all request/response models

### Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully",
  "timestamp": "2025-05-31T12:00:00.000Z"
}
```

### Error Handling

Error responses include detailed information:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": { ... }
  },
  "timestamp": "2025-05-31T12:00:00.000Z"
}
```

## 🔄 Data Pipelines

The TLP Systems includes data processing pipelines for analytics and reporting:

### Leave Utilization Pipeline

- Analyzes leave patterns and utilization metrics
- Generates monthly and quarterly reports
- Provides insights for workforce planning

### Running Pipelines

```bash
# Navigate to pipelines directory
cd pipelines

# Install dependencies (if not already done)
npm install

# Run specific pipeline
node leave_utilization/index.js

# Schedule pipeline with cron (optional)
# See pipelines/docs/production_guidelines.md for details
```

For detailed pipeline documentation, see:

- [Data Pipeline Documentation](./pipelines/docs/data-pipeline.md)
- [Production Guidelines](./pipelines/docs/production_guidelines.md)
- [Pipeline Roadmap](./pipelines/docs/roadmap.md)

## 🤝 Contributing

We welcome contributions to improve the TLP Systems platform!

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch** from `main`

   ```bash
   git checkout -b feature/amazing-feature main
   ```

3. **Make your changes** following our coding standards
4. **Write/update tests** for your changes
5. **Run the test suite**

   ```bash
   npm test
   ```

6. **Commit your changes** with descriptive messages

   ```bash
   git commit -m 'Add: Enhanced incident escalation workflow'
   ```

7. **Push to your branch**

   ```bash
   git push origin feature/amazing-feature
   ```

8. **Open a Pull Request** targeting the `main` branch

### Development Standards

- ✅ **Code Quality**: ESLint and Prettier configurations enforced
- ✅ **Testing**: Maintain test coverage above 80%
- ✅ **TypeScript**: Use TypeScript for frontend components
- ✅ **API Documentation**: Update Swagger specs for API changes
- ✅ **Database Changes**: Include Prisma migrations for schema updates
- ✅ **Documentation**: Update relevant documentation for new features

### Code Review Process

- All changes require review from at least one team member
- Automated checks must pass (tests, linting, type checking)
- Database schema changes require additional review
- Security-related changes need security team approval

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

- 📐 **[System Architecture](./docs/architecture.md)** - Overall system design and component relationships
- 🗃️ **[Database Schema](./docs/schema.md)** - Enhanced database structure with all models and relationships
- 🔁 **[Workflow Documentation](./docs/workflows.md)** - Business process flows and approval chains
- 🛠️ **[Setup & Prerequisites](./docs/setup.md)** - Detailed installation and configuration guide
- 🔧 **[Development Guidelines](./docs/development.md)** - Development standards and best practices
- 🧪 **[Testing Strategies](./docs/testing.md)** - Testing approaches and coverage requirements
- 🌐 **[API Documentation](./docs/api.md)** - Detailed API endpoint specifications
- ⚙️ **[Environment Configuration](./docs/env.md)** - Environment variable setup and configuration
- 📊 **[Data Pipeline Guide](./pipelines/docs/data-pipeline.md)** - Analytics pipeline architecture
- 🚀 **[Production Guidelines](./pipelines/docs/production_guidelines.md)** - Deployment and production setup

### Database Schema Highlights

The enhanced schema includes:

- **User Management** with role-based access control
- **Department Hierarchy** with line manager relationships
- **Leave Management** with LOCUM stand-in coordination
- **Financial Tracking** across all business operations
- **Comprehensive Approval Workflows** with delegation and escalation
- **Advanced Incident Management** with service interruption tracking
- **Multi-category Operational Requests**
- **Strategic Database Indexing** for optimal performance

## 👥 Team

### The Leo Project Development Team

- Internal development team
- External contributors
- Business stakeholders
- System administrators

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

# 🚀 TLP Systems - Enterprise Operations Platform

Built with modern technologies for scalable, maintainable business operations

**Features**: Leave Management • LOCUM Coordination • Finance Tracking • Incident Management • Approval Workflows

---

*"Streamlining operations through intelligent automation and comprehensive workflow management"*
