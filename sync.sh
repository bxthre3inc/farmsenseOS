#!/bin/bash
# FarmSense Auto-Sync Script
# Syncs changes between Antigravity IDE and Zo Computer

cd /home/workspace

LOG_FILE="/home/workspace/sync.log"

echo "$(date): Auto-sync script started" >> "$LOG_FILE"

while true; do
  # Check for internet connectivity
  if ! ping -c 1 github.com > /dev/null 2>&1; then
    echo "$(date): No internet connection, waiting..." >> "$LOG_FILE"
    sleep 60
    continue
  fi
  
  # Fetch remote changes
  git fetch origin > /dev/null 2>&1
  
  LOCAL=$(git rev-parse HEAD 2>/dev/null)
  REMOTE=$(git rev-parse origin/main 2>/dev/null)
  
  if [ "$LOCAL" != "$REMOTE" ]; then
    echo "$(date): Changes detected, syncing..." >> "$LOG_FILE"
    
    # Stash any local changes
    git stash > /dev/null 2>&1
    
    # Pull remote changes
    PULL_RESULT=$(git pull --rebase origin main 2>&1)
    
    if [ $? -eq 0 ]; then
      echo "$(date): Pull successful" >> "$LOG_FILE"
      
      # Restore stashed changes
      git stash pop > /dev/null 2>&1
      
      # Check if we have local changes to push
      if [ -n "$(git status --porcelain)" ]; then
        git add . > /dev/null 2>&1
        git commit -m "Auto-sync: Updates from Zo Computer" > /dev/null 2>&1
        git push origin main > /dev/null 2>&1
        echo "$(date): Pushed local changes" >> "$LOG_FILE"
      fi
    else
      echo "$(date): Pull failed: $PULL_RESULT" >> "$LOG_FILE"
      git stash pop > /dev/null 2>&1
    fi
  fi
  
  sleep 30
done
