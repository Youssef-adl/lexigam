#!/usr/bin/env sh
set -eu

composer install --no-dev --optimize-autoloader --no-interaction

php artisan storage:link
