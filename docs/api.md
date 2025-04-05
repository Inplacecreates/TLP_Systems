# 📡 TLP Systems App – API Documentation

## 🔑 Authentication

All API endpoints except `/auth/*` require a valid JWT token in the Authorization header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per user token

## 🛣️ API Endpoints

### Authentication

#### POST /api/auth/login

Login with email and password.

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password"
}
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJ0eXAiOiJKV1QiLCJ...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "STAFF"
  }
}
```

#### POST /api/auth/refresh

Get new access token using refresh token.

```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJ0eXAiOiJKV1QiLCJ..."
}
```

### Leave Management

#### POST /api/leave

Create new leave request.

```http
POST /api/leave
Content-Type: application/json

{
  "startDate": "2025-06-01",
  "endDate": "2025-06-07",
  "type": "ANNUAL",
  "locums": [
    {
      "id": 123,
      "startDate": "2025-06-01",
      "endDate": "2025-06-07"
    }
  ],
  "notes": "Annual vacation"
}
```

#### GET /api/leave

Get leave requests with optional filters.

```http
GET /api/leave?status=PENDING&year=2025
```

Response:

```json
{
  "items": [
    {
      "id": 1,
      "startDate": "2025-06-01",
      "endDate": "2025-06-07",
      "type": "ANNUAL",
      "status": "PENDING",
      "locums": [...]
    }
  ],
  "total": 1
}
```

### Locum Management

#### POST /api/locum/invoice

Submit locum invoice.

```http
POST /api/locum/invoice
Content-Type: application/json

{
  "leaveId": 1,
  "locumId": 123,
  "daysWorked": 7,
  "rate": 500,
  "totalAmount": 3500,
  "bankDetails": {
    "accountName": "John Doe",
    "accountNumber": "1234567890"
  }
}
```

#### GET /api/locum/assignments

Get locum assignments.

```http
GET /api/locum/assignments?status=ACTIVE
```

### Finance Records

#### POST /api/finance/record

Create finance record.

```http
POST /api/finance/record
Content-Type: application/json

{
  "amount": 3500,
  "category": "LOCUM",
  "description": "Locum coverage for Dr. Smith",
  "relatedLeaveId": 1,
  "budgetCode": "LOC2025"
}
```

#### GET /api/finance/records

Get finance records with filtering.

```http
GET /api/finance/records?category=LOCUM&year=2025&month=6
```

### Operational Requests

#### POST /api/ops/request

Submit operational request.

```http
POST /api/ops/request
Content-Type: application/json

{
  "itemName": "Laptop",
  "urgency": "MEDIUM",
  "estimatedCost": 1200,
  "department": "IT",
  "justification": "Replacement for faulty device"
}
```

#### GET /api/ops/requests

Get operational requests.

```http
GET /api/ops/requests?status=PENDING
```

### Incident Reports

#### POST /api/incident

Report new incident.

```http
POST /api/incident
Content-Type: application/json

{
  "type": "SAFETY",
  "description": "Slip hazard in lobby",
  "location": "Main Entrance",
  "severity": "MEDIUM",
  "witnessDetails": "Front desk staff"
}
```

#### GET /api/incident

Get incident reports.

```http
GET /api/incident?status=OPEN
```

## 📊 Response Formats

### Success Response

```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [...]
  }
}
```

## 🔧 Common Query Parameters

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sort`: Sort field (e.g., "createdAt:desc")
- `search`: Search term
- `filters`: JSON encoded filters

## 🎯 Status Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 422: Validation Error
- 500: Server Error

## 📱 Mobile API Considerations

### Optimizations

- Reduced payload size
- Pagination
- Partial responses
- Image optimization

### Offline Support

- Sync endpoints
- Conflict resolution
- Queue management
