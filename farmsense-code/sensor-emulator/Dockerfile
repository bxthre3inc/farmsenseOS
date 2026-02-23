FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# The sensor-emulator imports environment-simulator code, so we need both
# In docker-compose, we can just mount or copy both, but let's assume standard build contexts.
# Actually, the docker-compose build context will need access to both.
# But for now, just copy the emulator directory.
COPY . .

# Explicitly set python path so emulator can find its own modules
ENV PYTHONPATH=/app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8003"]
