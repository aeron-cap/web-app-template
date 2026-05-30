#!/bin/sh

set -e

echo "Running database migrations..."
# Run migrations
node dist/src/db/migrate.js

echo "Starting the application..."
exec "$@"