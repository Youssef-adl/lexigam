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



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
| PUBLIC
*/
Route::apiResource('produits', ProduitController::class)->only(['index','show']);
Route::get('produits/{id}/avis', [AvisController::class, 'getForProduct']);
Route::get('categories', [CategorieController::class, 'index']);

/*
| AUTH REQUIRED
*/
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    /*
    | ADMIN
    */
    Route::middleware('role:admin')->group(function () {
        Route::apiResource('users', UserController::class);
        // Routes d'approbation et suppression des produits
        Route::put('produits/{id}/approve', [ProduitController::class, 'approve']);
        Route::put('produits/{id}/reject', [ProduitController::class, 'reject']);
        Route::put('produits/{id}/approve-deletion', [ProduitController::class, 'approveDeletion']);
        Route::put('produits/{id}/reject-deletion', [ProduitController::class, 'rejectDeletion']);
        
        Route::put('retours/{id}/approve', [RetourController::class, 'approve']);
        Route::put('retours/{id}/reject', [RetourController::class, 'reject']);
        
        // Gestion des avis par l'admin
        Route::delete('avis/{id}', [AvisController::class, 'destroy']);
    });

    /*
    | ADMIN & VENDEUR
    */
    Route::middleware('role:admin,vendeur')->group(function () {
        Route::apiResource('categories', CategorieController::class);
        Route::post('produits', [ProduitController::class, 'store']);
        Route::put('produits/{produit}', [ProduitController::class, 'update']);
        Route::delete('produits/{produit}', [ProduitController::class, 'destroy']);
        Route::get('vendor-orders', [CommandeController::class, 'vendorOrders']); // Back to original name for dashboard compatibility
        Route::get('vendor-returns', [RetourController::class, 'vendorReturns']); // New route for vendors to see return requests
        Route::put('produits/{id}/request-deletion', [ProduitController::class, 'requestDeletion']);
    });

    /*
    | CLIENT
    */
    Route::middleware('role:client')->group(function () {
        Route::apiResource('paniers', PanierController::class);
        Route::post('paniers/sync', [PanierController::class, 'sync']);
        Route::apiResource('ligne-paniers', LignePanierController::class);
    });

    /*
    | ALL AUTH USERS
    */
    Route::apiResource('commandes', CommandeController::class);
    Route::apiResource('avis', AvisController::class)->except(['destroy']);
    Route::apiResource('retours', RetourController::class);
    Route::apiResource('paiements', PaiementController::class);
    Route::apiResource('livraisons', LivraisonController::class);
    Route::apiResource('ligne-commandes', LigneCommandeController::class);

});
