<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AuthSecurityTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_cannot_escalate_to_admin(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Attacker',
            'email' => 'attacker@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'admin',
        ]);

        $response->assertCreated();
        $this->assertDatabaseHas('users', [
            'email' => 'attacker@example.com',
            'role' => 'client',
        ]);
    }

    public function test_client_cannot_access_admin_payment_endpoints(): void
    {
        $client = User::factory()->create(['role' => 'client']);
        Sanctum::actingAs($client);

        $this->getJson('/api/paiements')->assertForbidden();
        $this->getJson('/api/livraisons')->assertForbidden();
        $this->getJson('/api/users')->assertForbidden();
    }
}
