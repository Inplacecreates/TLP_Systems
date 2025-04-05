# 🔧 TLP Systems App – Environment Variables

This document lists all environment variables used in the TLP Systems App, their purpose, and example values.

## 📋 Environment File

Create a `.env` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

## 🔑 Required Variables

### Database Configuration

```env
# PostgreSQL connection URL
DATABASE_URL="postgresql://user:password@localhost:5432/tlp_systems_db"

# Database connection pool settings
DB_POOL_MIN=2
DB_POOL_MAX=10
```

### Authentication

```env
# JWT secret key (min 32 characters)
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"

# JWT token expiry (in minutes)
JWT_EXPIRES_IN=60

# Refresh token expiry (in days)
REFRESH_TOKEN_EXPIRES_IN=7
```

### Server Configuration

```env
# Node environment (development/staging/production)
NODE_ENV="development"

# API port
PORT=3000

# API base URL
API_BASE_URL="http://localhost:3000"

# Frontend URL for CORS
FRONTEND_URL="http://localhost:3001"
```

## ⚙️ Optional Variables

### Email Service

```env
# SendGrid API key
SENDGRID_API_KEY="SG.xxxxx"

# SMTP configuration (alternative to SendGrid)
SMTP_HOST="smtp.example.com"
SMTP_PORT=587
SMTP_USER="user@example.com"
SMTP_PASS="smtp-password"
```

### File Storage

```env
# Local storage path
UPLOAD_PATH="./uploads"

# Cloud storage (optional)
CLOUD_STORAGE_BUCKET="tlp-systems-files"
CLOUD_STORAGE_REGION="us-east-1"
```

### Monitoring & Logging

```env
# Logging level (debug/info/warn/error)
LOG_LEVEL="info"

# Sentry DSN for error tracking
SENTRY_DSN="https://xxx@xxx.ingest.sentry.io/xxx"

# APM configuration
ELASTIC_APM_SERVER_URL="http://localhost:8200"
ELASTIC_APM_SECRET_TOKEN="apm-token"
```

### Rate Limiting

```env
# Rate limit window in minutes
RATE_LIMIT_WINDOW=15

# Max requests per window
RATE_LIMIT_MAX_REQUESTS=100
```

### Cache Configuration

```env
# Redis URL (optional)
REDIS_URL="redis://localhost:6379"

# Cache TTL in seconds
CACHE_TTL=3600
```

## 🏗️ Environment-Specific Settings

### Development

```env
NODE_ENV="development"
LOG_LEVEL="debug"
CORS_ORIGIN="*"
```

### Staging

```env
NODE_ENV="staging"
LOG_LEVEL="info"
CORS_ORIGIN="https://staging.tlpsystems.com"
```

### Production

```env
NODE_ENV="production"
LOG_LEVEL="warn"
CORS_ORIGIN="https://tlpsystems.com"
```

## 🔒 Security Notes

1. **Never commit `.env` files**
   - Keep `.env` in `.gitignore`
   - Only commit `.env.example`

2. **Secure key management**
   - Use strong secrets
   - Rotate keys regularly
   - Use key management service in production

3. **Access control**
   - Restrict env access
   - Use least privilege principle
   - Document who can modify

## 🚀 Deployment Configuration

### Docker Environment

```env
# Docker specific
DOCKER_REGISTRY="gcr.io/tlp-systems"
DOCKER_IMAGE_TAG="latest"
```

### Kubernetes Secrets

```env
# Convert env to k8s secrets
kubectl create secret generic tlp-env --from-env-file=.env
```

## ✅ Validation

The application validates all required environment variables on startup:

```typescript
// Required env validation
const requiredEnvVars = [
  'DATABASE_URL',
  'JWT_SECRET',
  'API_BASE_URL',
  'FRONTEND_URL'
];

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing required env var: ${varName}`);
  }
});
```

## 📋 Quick Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| DATABASE_URL | Yes | - | PostgreSQL connection URL |
| JWT_SECRET | Yes | - | JWT signing key |
| PORT | No | 3000 | API server port |
| LOG_LEVEL | No | info | Logging verbosity |
| REDIS_URL | No | - | Redis cache URL |

## 🔄 Updates

When adding new environment variables:

1. Update `.env.example`
2. Update this documentation
3. Update validation
4. Update deployment configs
5. Notify team members
