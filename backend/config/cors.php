<?php

$urls = env('FRONTEND_URL') ?: env('FRONTEND_URLS', 'http://localhost:5173');
$origins = array_values(array_filter(array_map('trim', explode(',', (string) $urls))));
if (!in_array('http://localhost:5173', $origins)) {
    $origins[] = 'http://localhost:5173';
}
if (!in_array('http://127.0.0.1:5173', $origins)) {
    $origins[] = 'http://127.0.0.1:5173';
}

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => $origins,
    'allowed_origins_patterns' => ['#^https://.*\.vercel\.app$#'],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
