#!/bin/bash

# Create test database
PGPASSWORD=postgres psql -U postgres -h localhost -c "DROP DATABASE IF EXISTS tlp_systems_test;"
PGPASSWORD=postgres psql -U postgres -h localhost -c "CREATE DATABASE tlp_systems_test;"

# Run migrations on test database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tlp_systems_test" npx prisma migrate deploy

echo "Test database setup complete!"
