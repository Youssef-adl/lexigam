<?php

namespace Tests\Feature;

use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_the_api_health_endpoint_is_available(): void
    {
        $this->get('/up')->assertOk();
    }
}
