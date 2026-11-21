#!/usr/bin/env sh
set -eu

composer install --no-dev --optimize-autoloader --no-interaction

# Create the public symlink in the image.
php artisan storage:link
