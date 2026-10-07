<?php

namespace Tests\Feature;

use App\Models\Categorie;
use App\Models\Commande;
use App\Models\Produit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CommerceSecurityTest extends TestCase
{
    use RefreshDatabase;

    private function product(int $stock = 5): Produit
    {
        $vendor = User::factory()->create(['role' => 'vendeur']);
        $category = Categorie::factory()->create();

        return Produit::create([
            'nom' => 'Test Jacket',
            'description' => 'Test product',
            'prix' => 100,
            'stock' => $stock,
            'image' => null,
            'user_id' => $vendor->id,
            'categorie_id' => $category->id,
            'statut' => 'approved',
        ]);
    }

    public function test_client_cannot_read_another_clients_order(): void
    {
        $product = $this->product();
        $owner = User::factory()->create(['role' => 'client']);
        $other = User::factory()->create(['role' => 'client']);

        Sanctum::actingAs($owner);

        $created = $this->postJson('/api/commandes', [
            'items' => [['id' => $product->id, 'quantite' => 1]],
            'adresse' => '1 Main Street',
            'ville' => 'Casablanca',
            'telephone' => '0600000000',
            'payment_mode' => 'cash',
        ])->assertCreated();

        $orderId = $created->json('commande_id');

        Sanctum::actingAs($other);
        $this->getJson('/api/commandes/'.$orderId)->assertForbidden();
    }

    public function test_order_cancellation_restores_stock_only_once(): void
    {
        $product = $this->product(5);
        $client = User::factory()->create(['role' => 'client']);
        Sanctum::actingAs($client);

        $created = $this->postJson('/api/commandes', [
            'items' => [['id' => $product->id, 'quantite' => 2]],
            'adresse' => '1 Main Street',
            'ville' => 'Rabat',
            'telephone' => '0600000000',
            'payment_mode' => 'cash',
        ])->assertCreated();

        $orderId = $created->json('commande_id');
        $this->assertDatabaseHas('produits', ['id' => $product->id, 'stock' => 3]);

        $this->patchJson('/api/commandes/'.$orderId.'/cancel')->assertOk();
        $this->assertDatabaseHas('produits', ['id' => $product->id, 'stock' => 5]);

        $this->patchJson('/api/commandes/'.$orderId.'/cancel')->assertStatus(422);
        $this->assertDatabaseHas('produits', ['id' => $product->id, 'stock' => 5]);
    }

    public function test_pending_products_are_not_publicly_visible(): void
    {
        $product = $this->product();
        $product->update(['statut' => 'pending']);

        $this->getJson('/api/produits')
            ->assertOk()
            ->assertJsonMissing(['id' => $product->id]);

        $this->getJson('/api/produits/'.$product->id)->assertNotFound();
    }
}
