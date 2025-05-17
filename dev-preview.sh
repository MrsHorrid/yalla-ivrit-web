#!/bin/bash

# Kill any existing development servers
echo "Stopping any existing servers..."
pkill -f "pnpm run dev" || true

# Start the development server
echo "Starting development server..."
pnpm run dev &

# Wait for the server to start
echo "Waiting for server to start..."
sleep 5

# Open the browser
echo "Opening browser at http://localhost:8080"
open http://localhost:8080
