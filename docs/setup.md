# 🧰 TLP Systems App – Setup & Prerequisites Guide

This guide walks you through installing everything required to run the **TLP Systems App** on both **macOS** and **Windows (via WSL)**. The app runs on a modern tech stack (React, Node.js, PostgreSQL), and this guide will help you get up and running fast.

---

## ✅ Tools Required

| Tool             | Purpose                            |
|------------------|------------------------------------|
| **Git**          | Version control                    |
| **NVM**          | Node Version Manager               |
| **Node.js + npm**| JavaScript runtime & package manager |
| **PostgreSQL**   | Relational database                |
| **VS Code**      | Code editor (optional)             |
| **WSL 2**        | Linux environment (Windows only)   |

---

## 🍏 macOS Setup (Using Homebrew)

### 1. Install Homebrew (if not already installed)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. Install Git

```bash
brew install git
```

### 3. Install NVM (Node Version Manager)

```bash
brew install nvm
```

Follow the post-installation instructions to set up your shell environment for NVM.

### 4. Install Node.js using NVM

```bash
nvm install 22
nvm use 22
nvm alias default 22
```

### 5. Install PostgreSQL

```bash
brew install postgresql
brew services start postgresql
```

### 6. Verify Installations

```bash
node -v  # Should show v22.x.x
npm -v
git --version
psql --version
```

### 7. Install VS Code

```bash
brew install --cask visual-studio-code
```

---

## 🪟 Windows Setup (Using WSL 2 + Ubuntu)

### 1. Install WSL 2

Open **PowerShell as Administrator**, and run:

```powershell
wsl --install
```

> This installs WSL 2 and Ubuntu automatically. Restart your computer if prompted.

---

### 2. Set Up Ubuntu (First Launch)

- Open the Ubuntu terminal from the Start Menu
- Create a UNIX username and password when prompted

---

### 3. Install NVM and Node.js Inside WSL

```bash
sudo apt update && sudo apt upgrade -y

# Git
sudo apt install git -y

# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# Close and reopen terminal, then install Node.js 22
nvm install 22
nvm use 22
nvm alias default 22
```

---

### 4. Install PostgreSQL

```bash
sudo apt install postgresql postgresql-contrib -y
sudo service postgresql start
```

---

### 5. Verify Installations

```bash
node -v  # Should show v22.x.x
npm -v
git --version
psql --version
```

---

### 6. (Optional) Create PostgreSQL User & Database

```bash
sudo -u postgres createuser --interactive
sudo -u postgres createdb tlp_systems_db
```

---

### 7. Use VS Code with WSL

Install the **Remote - WSL** extension in VS Code. Then launch your project using:

```bash
code .
```

---

## 🚀 TLP App Project Setup

Once your system is ready, follow these steps to install and run the app:

---

### 1. Clone the Repository

```bash
git clone https://github.com/Inplacecreates/TLP_Systems.git
cd TLP_Systems
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Set Up Environment Variables

```bash
cp .env.example .env
```

Then edit the `.env` file to match your local database settings.

---

### 4. Run Prisma Migrations

```bash
npx prisma generate
npx prisma migrate dev
```

---

### 5. Start the App Locally

```bash
# Start Backend
cd backend
npm run dev

# Start Frontend (in another terminal)
cd frontend
npm run dev
```

---

## 🧪 Common Dev Commands

```bash
# Format codebase
npm run format

# Run both apps together (if configured)
npm run dev:all

# Validate Prisma schema
npx prisma validate
```

---
