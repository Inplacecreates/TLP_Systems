# 🛠️ TLP Systems App – Development Guide

This guide covers the development environment setup, coding standards, and best practices for the TLP Systems App.

## 📦 VS Code Setup

### Required Extensions

```json
{
    "recommendations": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "prisma.prisma",
        "ms-vscode.vscode-typescript-next",
        "bradlc.vscode-tailwindcss",
        "GraphQL.vscode-graphql",
        "mikestead.dotenv",
        "christian-kohler.path-intellisense",
        "streetsidesoftware.code-spell-checker"
    ]
}
```

### VS Code Settings

```json
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "typescript.tsdk": "node_modules/typescript/lib"
}
```

## 🎨 Code Formatting

### Prettier Configuration

```json
{
    "semi": true,
    "trailingComma": "es5",
    "singleQuote": true,
    "printWidth": 100,
    "tabWidth": 2,
    "useTabs": false
}
```

### ESLint Configuration

```json
{
    "extends": [
        "next",
        "prettier"
    ],
    "rules": {
        "no-unused-vars": "error",
        "no-console": "warn"
    }
}
```

## 📝 Git Configuration

### Git Hooks (using Husky)

```bash
# Pre-commit hook
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint-staged
```

### Commit Message Convention

```
type(scope): subject

body

footer
```

Types:

- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance

Example:

```
feat(leave): add multiple locum support

- Allow up to 4 locums per leave request
- Add validation for overlapping dates
- Update UI to show multiple locum fields

Closes #123
```

## 🔧 Project Structure

```
TLP_Systems/
├── frontend/
│   ├── components/
│   │   ├── common/
│   │   ├── forms/
│   │   └── layout/
│   ├── hooks/
│   ├── pages/
│   ├── styles/
│   └── utils/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── services/
└── shared/
    ├── types/
    └── constants/
```

## 🚀 Development Workflow

1. **Branch Creation**

   ```bash
   git checkout -b feature/feature-name
   ```

2. **Development Loop**

   ```bash
   # Start development servers
   npm run dev:all
   
   # Run tests in watch mode
   npm run test:watch
   ```

3. **Code Quality Checks**

   ```bash
   # Run all checks
   npm run validate
   
   # Individual checks
   npm run lint
   npm run type-check
   npm run test
   ```

4. **Pull Request Process**
   - Update branch with main
   - Run full test suite
   - Fill PR template
   - Request review

## 🐛 Debugging

### VS Code Launch Configurations

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Debug Backend",
            "program": "${workspaceFolder}/backend/src/index.ts",
            "preLaunchTask": "tsc: build - tsconfig.json",
            "outFiles": ["${workspaceFolder}/dist/**/*.js"]
        }
    ]
}
```

### Chrome DevTools

- React Components tab
- Network request monitoring
- Performance profiling
- Memory analysis

## 🔍 Code Review Guidelines

### Pull Request Template

```markdown
## Description
[Description of changes]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing performed

## Screenshots
[If applicable]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests pass locally
```

### Review Checklist

1. Code Quality
   - Follows style guide
   - No code smells
   - Proper error handling

2. Testing
   - Adequate test coverage
   - Edge cases covered
   - Performance considered

3. Security
   - Input validation
   - Authorization checks
   - Data sanitization

4. Documentation
   - Code comments
   - API documentation
   - README updates

## 📈 Performance Guidelines

### Frontend

- Lazy loading
- Code splitting
- Image optimization
- Bundle size monitoring

### Backend

- Query optimization
- Caching strategy
- Rate limiting
- Connection pooling

## 🔒 Security Best Practices

1. **Authentication**
   - Use JWT securely
   - Implement refresh tokens
   - Rate limit auth endpoints

2. **Data Protection**
   - Sanitize user input
   - Validate file uploads
   - Encrypt sensitive data

3. **API Security**
   - CORS configuration
   - Request validation
   - Error handling

## 📚 Learning Resources

### Documentation

- [Project Wiki](./wiki)
- [API Documentation](./api-docs)
- [Architecture Guide](./architecture.md)
- [Testing Guide](./testing.md)

### External Resources

- [React Best Practices](https://reactjs.org/docs/thinking-in-react.html)
- [Node.js Security](https://nodejs.org/en/security/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
