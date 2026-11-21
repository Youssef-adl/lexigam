#!/usr/bin/env sh
set -eu

composer install --no-dev --optimize-autoloader --no-interaction

# Create the public symlink in the image. The Railway volume is mounted at
# runtime over storage/app/public, so uploaded files remain persistent.
php artisan storage:link
