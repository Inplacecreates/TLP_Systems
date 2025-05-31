# 🚀 TLP Systems App

> A custom-built enterprise platform powering The Leo Project's internal operations

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-Frontend-blue)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)](https://www.postgresql.org/)

## 📑 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Version Control](#version-control)
- [Contributing](#contributing)
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

The **TLP Systems App** streamlines critical business processes through an integrated platform designed for both immediate impact and long-term sustainability. Our system empowers teams with:

- 🌴 Leave Management
- 👥 Locum Assignment & Invoicing
- 💰 Finance Records & Budget Tracking
- 📦 Operational Requests
- ⚠️ Incident Reporting
- ✅ Multi-step Approvals
- 🔔 Notifications & Logs
- 📊 Role-Based Dashboards

## 🎯 Features

### Leave + Locum Management

- Streamlined request submission workflow
- Automated locum assignment
- Integrated invoicing system
- Cross-validation with leave data

### Finance Operations

- Budget tracking and forecasting
- Expense categorization
- Payment-budget linking
- Reimbursement tracking

### Operations Hub

- Resource request management
- Cost estimation and tracking
- Multi-level approval flows
- Real-time status updates

### Incident Management

- Structured reporting system
- Escalation workflows
- Resolution tracking
- Follow-up action monitoring

### Smart Notifications

- Role-based alert system
- Multi-channel delivery
- Automatic status updates
- Custom notification rules

### Audit & Compliance

- Comprehensive action logging
- System traceability
- Data validation checks
- Compliance reporting

## 🛠️ Tech Stack

| Layer        | Technology                    | Purpose                               |
|--------------|------------------------------|---------------------------------------|
| **Frontend** | React.js, Next.js           | UI Framework & Server-Side Rendering  |
|             | Tailwind CSS                 | Styling & Component Design           |
| **Backend**  | Node.js (v22.x), Express.js | Server Runtime & API Framework       |
| **Database** | PostgreSQL                  | Primary Data Store                   |
|             | Prisma ORM                   | Database Interface & Migrations      |
| **Auth**     | Custom RBAC                 | Access Control & Permissions         |
|             | JWT & Bcrypt                 | Authentication Services             |
| **Services** | SendGrid/SMTP               | Email Communications                 |
| **Hosting**  | GCP, Vercel, Railway       | Deployment & Infrastructure         |
| **Testing**  | Jest, React Testing Library | Unit & Integration Testing          |
|             | Supertest                    | API Testing                         |
| **CI/CD**    | GitHub Actions              | Continuous Integration & Deployment  |
| **DevTools** | ESLint, Prettier           | Code Quality & Formatting           |
|             | NVM                         | Node Version Manager                |

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

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- auth.controller.test.js
```

### Frontend Tests

```bash
cd frontend

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- login.test.tsx
```

### CI/CD Pipeline

Our project uses GitHub Actions for continuous integration and deployment:

- 🔍 Code quality checks (ESLint, Prettier)
- 🧪 Automated testing (Backend & Frontend)
- 📊 Code coverage reporting
- 🔒 Security vulnerability scanning
- 🚀 Automated deployments

## 📁 Project Structure

```
TLP-Systems-App/
├── backend/
│   ├── controllers/         # Request handlers
│   ├── routes/             # API endpoints
│   ├── middleware/         # Custom middleware
│   ├── services/          # Business logic
│   ├── prisma/           # Database schema & migrations
│   ├── swagger/          # API documentation
│   ├── test/            # Unit & integration tests
│   ├── utils/           # Helper functions
│   └── server.js         # Entry point
│
├── frontend/
│   ├── app/             # Next.js app directory
│   ├── components/       # Reusable UI components
│   ├── public/          # Static assets
│   └── styles/          # Global styles & themes
│
├── pipelines/           # Data processing pipelines
│   ├── leave_utilization/  # Leave data analysis
│   └── docs/               # Pipeline documentation
│
├── docs/              # Documentation & diagrams
│   ├── api.md           # API usage documentation
│   ├── architecture.md   # System architecture documentation
│   ├── development.md    # Development guidelines
│   ├── env.md           # Environment variable documentation
│   ├── schema.md         # Database schema documentation
│   ├── setup.md          # Setup & prerequisites guide
│   ├── testing.md        # Testing strategies
│   └── workflows.md      # Business workflows documentation
├── .env.example       # Environment template
├── .nvmrc             # Node version configuration
├── README.md
└── LICENSE
```

## 🚀 Getting Started

### Prerequisites

- Git installed
- NVM (Node Version Manager) installed
- Node.js v22.x (installed via NVM)
- PostgreSQL database
- VS Code (recommended)

For detailed setup instructions for different operating systems, see our [Setup & Prerequisites Guide](./docs/setup.md).

### Node Version Setup (NVM)

We recommend using NVM to manage Node.js versions:

```bash
# Install Node.js v22.x
nvm install 22

# Use Node.js v22.x
nvm use 22

# Set as default
nvm alias default 22
```

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Inplacecreates/TLP_Systems.git
   cd TLP_Systems
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env
   # Configure your environment variables
   ```

4. **Database Setup**

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Start Development Servers**

   ```bash
   # Backend
   cd backend && npm run dev

   # Frontend
   cd frontend && npm run dev
   ```

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

### Common Commands

```bash
# Format code
npm run format

# Run both apps concurrently
npm run dev:all

# Validate Prisma schema
npx prisma validate
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

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/leave` | Submit leave request |
| PATCH | `/api/leave/approve` | Approve/reject leave |
| POST | `/api/locum/invoice` | Submit locum invoice |
| POST | `/api/finance/record` | Log finance record |
| POST | `/api/ops/request` | Submit operational request |
| POST | `/api/incident` | Report an incident |
| GET | `/api/approvals` | List approvals by user/role |

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

We welcome internal contributions and community ideas!

1. Fork the repository
2. Create a branch from `main` (`git checkout -b feature/amazing-feature main`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request targeting the `main` branch

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

- 📐 [System Architecture](./docs/architecture.md) - Overall system design
- 🧱 [Database Schema](./docs/schema.md) - Database structure and relationships
- 🔁 [Workflow Diagrams](./docs/workflows.md) - Business process flows
- 🧰 [Setup & Prerequisites](./docs/setup.md) - Detailed installation guide
- 🔑 [Environment Variables](./docs/env.md) - Configuration options
- 📡 [API Documentation](./docs/api.md) - API endpoints and usage
- 💻 [Development Guide](./docs/development.md) - Development standards & practices
- 🧪 [Testing Guide](./docs/testing.md) - Testing strategies and examples

Additional documentation for data pipelines:

- 📊 [Data Pipeline](./pipelines/docs/data-pipeline.md) - Pipeline architecture and functions
- 🚀 [Production Guidelines](./pipelines/docs/production_guidelines.md) - Deployment best practices
- 🗺️ [Pipeline Roadmap](./pipelines/docs/roadmap.md) - Future development plans

## 👥 Team

- **The Leo Project Dev Team** – Internal + external contributors

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <strong>Built with ❤️ for impact-driven teams</strong>
  <br />
  <em>"Design systems that serve people, not the other way around."</em>
</div>
