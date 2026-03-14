#!/bin/bash
# FarmSense Deployment Script
# Pulls latest changes from GitHub and restarts services if needed

set -e

echo "🚀 Deploying FarmSense..."

# Pull latest changes
echo "📥 Pulling latest from origin/main..."
git fetch origin
git pull origin main

# Check if backend changed
if git diff --name-only HEAD@{1} HEAD | grep -q "farmsense-code/backend"; then
    echo "📦 Backend changes detected, restarting services..."
    # Add your service restart commands here
    # Example: systemctl restart farmsense-backend (or your service manager)
fi

# Check if frontend changed
if git diff --name-only HEAD@{1} HEAD | grep -q "farmsense-code/frontend"; then
    echo "🎨 Frontend changes detected, you may need to rebuild..."
    # Add your frontend build commands here
fi

echo "✅ Deployment complete!"
echo "Run 'git log --oneline -5' to see recent changes"
