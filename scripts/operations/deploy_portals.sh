#!/bin/bash
set -e

echo "Starting FarmSense Portals Build & Deploy..."

# Directories
BASE_DIR="$(pwd)/farmsense-code/frontend"
NGINX_DIR="/var/www"

# 1. Build and Deploy Marketing Site
echo "Building Marketing Site..."
cd "$BASE_DIR/marketing-site"
npm install
npm run build
echo "Deploying Marketing Site..."
sudo mkdir -p "$NGINX_DIR/marketing-site"
sudo cp -r dist/* "$NGINX_DIR/marketing-site/"

# 2. Build and Deploy Farmer Dashboard
echo "Building Farmer Dashboard..."
cd "$BASE_DIR/farmsense-portal"
npm install
npm run build
echo "Deploying Farmer Dashboard..."
sudo mkdir -p "$NGINX_DIR/farmer-dashboard"
sudo cp -r dist/* "$NGINX_DIR/farmer-dashboard/"

# 3. Build and Deploy Regulatory Portal
echo "Building Regulatory Portal..."
cd "$BASE_DIR/regulatory-portal"
npm install
npm run build
echo "Deploying Regulatory Portal..."
sudo mkdir -p "$NGINX_DIR/regulatory-portal"
sudo cp -r dist/* "$NGINX_DIR/regulatory-portal/"

echo "Restarting NGINX..."
# Assuming nginx runs via docker or systemd based on environment. 
# For docker-compose unified:
cd "$BASE_DIR/../deployment/docker"
docker-compose -f docker-compose.zo-unified.yml restart nginx || echo "Ensure Docker Compose is running to restart NGINX"

echo "Deploy complete!"
