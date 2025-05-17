#!/bin/bash

# Build the production version of the website using pnpm
echo "Building production version with pnpm..."
pnpm run build

# Start the production server
echo "Starting production server..."
pnpm run start
