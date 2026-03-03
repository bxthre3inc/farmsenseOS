#!/bin/bash
cd /home/workspace/farmsense-code/backend
source venv/bin/activate
export PORT=${PORT:-8000}
export JWT_SECRET="farmsense-tactical-secret-2026-v1-mvp"
export SECRET_KEY="farmsense_jwt_secret_key_minimum_32_characters_long_2026"
export DATABASE_URL="postgresql://farmsense_user:farmsense_secure_2026@localhost:5432/farmsense_core"
export TIMESCALE_URL="postgresql://farmsense_user:farmsense_secure_2026@localhost:5432/farmsense_timeseries"
export MAP_DATABASE_URL="postgresql://farmsense_user:farmsense_secure_2026@localhost:5432/farmsense_core"
uvicorn app.api.main:app --host 0.0.0.0 --port $PORT
