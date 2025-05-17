#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
pnpm install

# Build the production version of the website
echo "Building production version..."
pnpm run build

# Start the production server
echo "Starting production server..."
pnpm run start
