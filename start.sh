#!/bin/bash
# start.sh at the root

# Navigate to backend
cd backend

# Install dependencies
pip install -r requirements.txt

# Collect static files (if needed)
python manage.py collectstatic --noinput

# Run the Django server
gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT