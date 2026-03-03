#!/bin/bash
cd /home/workspace/farmsense-code/frontend/cc-portal
export PORT=${PORT:-3000}
bun run start
