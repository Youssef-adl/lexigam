<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Authentication is handled by Sanctum personal access tokens in
        // the Authorization: Bearer header. The SPA and API are hosted on
        // different top-level domains, so cookie-based SPA auth / CSRF
        // initialization is intentionally not enabled.
        $middleware->append(\App\Http\Middleware\SecurityHeaders::class);
        $middleware->alias([
            'role' => \App\Http\Middleware\RoleMiddleware::class,
        ]);
        $middleware->redirectGuestsTo(fn () => null);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // API errors must never try to redirect to a browser login route.
        $exceptions->shouldRenderJsonWhen(
            fn ($request, $exception) => $request->is('api/*') || $request->expectsJson()
        );
    })->create();
