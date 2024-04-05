#!/bin/sh

# Create ./www if it doesn't exist
mkdir -p www

# Store current directory
current_dir=$(pwd)

# Clone the repository to a temporary folder
git clone https://github.com/lokoguard/dashboard /tmp/dashboard

# Change directory to the cloned repository
cd /tmp/dashboard

# Install dependencies using npm
npm install

# Run npm build
npm run build

# Copy the build directory to ./www
cp -r dist/* $current_dir/www

# Clean up temporary directory
rm -rf /tmp/dashboard
