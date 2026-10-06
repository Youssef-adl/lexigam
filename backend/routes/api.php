<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\PanierController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\PaiementController;
use App\Http\Controllers\LivraisonController;
use App\Http\Controllers\AvisController;
use App\Http\Controllers\RetourController;
use App\Http\Controllers\LigneCommandeController;
use App\Http\Controllers\LignePanierController;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register'])->middleware('throttle:register');
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:login');

Route::apiResource('produits', ProduitController::class)->only(['index','show']);
Route::get('produits/{id}/avis', [AvisController::class, 'getForProduct']);
Route::get('categories', [CategorieController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::middleware('role:admin')->group(function () {
        Route::apiResource('users', UserController::class);
        Route::apiResource('categories', CategorieController::class);
        Route::put('produits/{id}/approve', [ProduitController::class, 'approve']);
        Route::put('produits/{id}/reject', [ProduitController::class, 'reject']);
        Route::put('produits/{id}/approve-deletion', [ProduitController::class, 'approveDeletion']);
        Route::put('produits/{id}/reject-deletion', [ProduitController::class, 'rejectDeletion']);
        Route::put('retours/{id}/approve', [RetourController::class, 'approve']);
        Route::put('retours/{id}/reject', [RetourController::class, 'reject']);
        Route::delete('avis/{id}', [AvisController::class, 'destroy']);
        Route::patch('commandes/{id}/status', [CommandeController::class, 'updateStatus']);
        Route::apiResource('paiements', PaiementController::class);
        Route::apiResource('livraisons', LivraisonController::class);
        Route::apiResource('ligne-commandes', LigneCommandeController::class);
        Route::get('avis', [AvisController::class, 'index']);
    });

    Route::middleware('role:admin,vendeur')->group(function () {
        Route::post('produits', [ProduitController::class, 'store']);
        Route::put('produits/{produit}', [ProduitController::class, 'update']);
        Route::delete('produits/{produit}', [ProduitController::class, 'destroy']);
        Route::get('vendor-orders', [CommandeController::class, 'vendorOrders']);
        Route::get('vendor-returns', [RetourController::class, 'vendorReturns']);
        Route::put('produits/{id}/request-deletion', [ProduitController::class, 'requestDeletion']);
    });

    Route::middleware('role:client')->group(function () {
        Route::apiResource('paniers', PanierController::class);
        Route::post('paniers/sync', [PanierController::class, 'sync']);
        Route::apiResource('ligne-paniers', LignePanierController::class);
        Route::post('commandes', [CommandeController::class, 'store']);
        Route::patch('commandes/{id}/cancel', [CommandeController::class, 'cancel']);
        Route::post('avis', [AvisController::class, 'store']);
        Route::get('retours', [RetourController::class, 'index']);
        Route::post('retours', [RetourController::class, 'store']);
    });

    Route::middleware('role:admin,client')->group(function () {
        Route::get('commandes', [CommandeController::class, 'index']);
        Route::get('commandes/{id}', [CommandeController::class, 'show']);
    });
});
