#!/usr/bin/env bash
# exit on error
set -o errexit

# Install Python dependencies
pip install -r requirements.txt

# Install additional package
pip install rapidfuzz

# Collect static files
python manage.py collectstatic --no-input

# Run migrations
python manage.py migrate
