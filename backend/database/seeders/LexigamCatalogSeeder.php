<?php

namespace Database\Seeders;

use App\Models\Categorie;
use App\Models\Produit;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class LexigamCatalogSeeder extends Seeder
{
    private const FRONTEND_ASSET_BASE = 'https://lexigam-xi.vercel.app';

    public function run(): void
    {
        $categories = [
            'Men' => 'LEXIGAM menswear and streetwear pieces.',
            'Women' => 'LEXIGAM womenswear and contemporary essentials.',
            'Accessoires' => 'LEXIGAM accessories and everyday objects.',
            'Art' => 'Limited art prints and screen-printed editions by LEXIGAM.',
        ];

        $products = [
            [
                'nom' => 'T-shirt Oversize « Grow » — Écru & Marquage Atelier',
                'category' => 'Men',
                'prix' => 450.00,
                'stock' => 25,
                'description' => 'T-shirt oversize écru avec petit marquage noir discret sur la poitrine.',
                'image' => '/molimao/prod-grow-1.jpg',
                'hover' => '/molimao/prod-grow-2.jpg',
                'sizes' => ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                'fit' => 'Coupe oversize streetwear',
                'material' => 'Coton',
            ],
            [
                'nom' => 'Casquette Trucker « Radiant » — Mesh Kaki',
                'category' => 'Men',
                'prix' => 790.00,
                'stock' => 20,
                'description' => 'Casquette trucker kaki avec panneaux latéraux en mesh et marquage graphique discret à l’avant.',
                'image' => '/molimao/prod-radiant-1.jpg',
                'hover' => '/molimao/prod-radiant-2.jpg',
                'sizes' => ['Taille unique'],
                'fit' => 'Taille unique avec fermeture réglable',
                'material' => 'Panneaux textiles et mesh respirant',
            ],
            [
                'nom' => 'Sweat Col Rond « Puder » — Beige Sable',
                'category' => 'Women',
                'prix' => 690.00,
                'stock' => 15,
                'description' => 'Sweat col rond beige sable avec motif abstrait noir sur le devant et petite signature orange.',
                'image' => '/molimao/prod-puder-1.jpg',
                'hover' => '/molimao/prod-puder-2.jpg',
                'sizes' => ['S', 'M', 'L', 'XL'],
                'fit' => 'Coupe unisexe confort',
                'material' => 'Molleton doux',
            ],
            [
                'nom' => 'Sweat Graphique « Krom » — Noir',
                'category' => 'Men',
                'prix' => 450.00,
                'stock' => 18,
                'description' => 'Sweat noir à manches longues, col rond et grand motif graphique blanc sur le devant.',
                'image' => '/molimao/prod-krom-1.jpg',
                'hover' => '/molimao/prod-krom-2.jpg',
                'sizes' => ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                'fit' => 'Coupe droite ample',
                'material' => 'Molleton doux',
            ],
            [
                'nom' => 'T-shirt Minimaliste « Sutra » — Noir Minéral',
                'category' => 'Men',
                'prix' => 420.00,
                'stock' => 22,
                'description' => 'L’essentiel du vestiaire streetwear quotidien. Coupe droite moderne et col côtelé indéformable.',
                'image' => '/molimao/prod-sutra-1.jpg',
                'hover' => '/molimao/prod-sutra-2.jpg',
                'sizes' => ['S', 'M', 'L', 'XL', 'XXL'],
                'fit' => 'Coupe droite contemporaine',
                'material' => '100% jersey de coton 220g',
            ],
            [
                'nom' => 'T-shirt Studio « Cupid » — Coupe Boxy Femme',
                'category' => 'Women',
                'prix' => 450.00,
                'stock' => 14,
                'description' => 'Coupe ample boxy contemporaine avec illustration studio originale imprimée à la main.',
                'image' => '/molimao/prod-cupid-1.jpg',
                'hover' => '/molimao/prod-cupid-2.jpg',
                'sizes' => ['XS', 'S', 'M', 'L'],
                'fit' => 'Coupe boxy loose',
                'material' => '100% coton doux 200g',
            ],
            [
                'nom' => 'T-shirt « Dijamant » — Sérigraphie Géométrique',
                'category' => 'Women',
                'prix' => 450.00,
                'stock' => 30,
                'description' => 'Motif géométrique inspiré du brutalisme sur jersey de coton épais doux au toucher.',
                'image' => '/molimao/prod-diamond-1.jpg',
                'hover' => '/molimao/prod-diamond-2.jpg',
                'sizes' => ['S', 'M', 'L'],
                'fit' => 'Coupe décontractée',
                'material' => '100% coton peigné 220g',
            ],
            [
                'nom' => 'T-shirt « Borovi » — Vert Forêt Urbex',
                'category' => 'Men',
                'prix' => 420.00,
                'stock' => 10,
                'description' => 'Teinte vert forêt profond, inspiré de la nature brute environnante et des explorations urbaines.',
                'image' => '/molimao/prod-borovi-1.jpg',
                'hover' => '/molimao/prod-borovi-2.jpg',
                'sizes' => ['XS', 'S', 'M', 'L', 'XL'],
                'fit' => 'Coupe droite classique',
                'material' => '100% coton peigné 220g',
            ],
            [
                'nom' => 'T-shirt « Rituals » — Coton Lourd Noir',
                'category' => 'Men',
                'prix' => 450.00,
                'stock' => 18,
                'description' => 'Inspiré des rituels caféiers des métropoles. Graphisme sérigraphié haute durabilité.',
                'image' => '/molimao/prod-kafa-m-1.jpg',
                'hover' => '/molimao/prod-kafa-m-2.jpg',
                'sizes' => ['S', 'M', 'L', 'XL', 'XXL'],
                'fit' => 'Coupe streetwear droite',
                'material' => '100% coton lourd 240g',
            ],
            [
                'nom' => 'T-shirt « Pahulja » — Gris Chiné Homme',
                'category' => 'Men',
                'prix' => 420.00,
                'stock' => 16,
                'description' => 'Gris chiné intemporel, maille dense et douce pour un confort supérieur en toutes saisons.',
                'image' => '/molimao/prod-pahulja-m-1.jpg',
                'hover' => '/molimao/prod-pahulja-m-2.jpg',
                'sizes' => ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                'fit' => 'Coupe droite ajustée',
                'material' => 'Coton peigné & jersey chiné',
            ],
            [
                'nom' => 'T-shirt « Pahulja » — Blanc Craie Femme',
                'category' => 'Women',
                'prix' => 420.00,
                'stock' => 15,
                'description' => 'Blanc craie lumineux, coupe féminine décontractée et col net en bord-côte double.',
                'image' => '/molimao/prod-pahulja-w-1.jpg',
                'hover' => '/molimao/prod-pahulja-w-2.jpg',
                'sizes' => ['XS', 'S', 'M', 'L'],
                'fit' => 'Coupe féminine décontractée',
                'material' => '100% coton peigné 200g',
            ],
            [
                'nom' => 'Portefeuille Cuir « Frame » — Tannage Végétal',
                'category' => 'Accessoires',
                'prix' => 590.00,
                'stock' => 12,
                'description' => 'Cuir véritable teinté dans la masse avec logo LEXIGAM marqué à chaud et fentes pour cartes.',
                'image' => '/molimao/prod-frame-1.jpg',
                'hover' => '/molimao/prod-frame-2.jpg',
                'sizes' => ['Taille Unique'],
                'fit' => 'Format poche compact',
                'material' => '100% cuir de vachette pleine fleur',
            ],
            [
                'nom' => 'Tirage Édition 01 — « Avion » Sérigraphie Numérotée',
                'category' => 'Art',
                'prix' => 350.00,
                'stock' => 35,
                'description' => 'Tirage d’art numéroté et gaufré à la main sur papier d’archive 250g.',
                'image' => '/molimao/art-avion-1.jpg',
                'hover' => '/molimao/art-avion-2.jpg',
                'sizes' => ['30x40 cm', '50x70 cm'],
                'fit' => 'Format standard pour encadrement',
                'material' => 'Papier d’art d’archive 250g',
            ],
            [
                'nom' => 'Tirage Édition 02 — « Mahala Color » Architecture Urbaine',
                'category' => 'Art',
                'prix' => 350.00,
                'stock' => 30,
                'description' => 'Composition géométrique et teintes chaudes inspirées des façades urbaines contemporaines.',
                'image' => '/molimao/art-color-mahala-1.jpg',
                'hover' => '/molimao/art-color-mahala-2.jpg',
                'sizes' => ['30x40 cm', '50x70 cm'],
                'fit' => 'Format standard pour encadrement',
                'material' => 'Papier d’art d’archive 250g',
            ],
            [
                'nom' => 'Tirage Édition 03 — « Mahala Noir » Étude Géométrique',
                'category' => 'Art',
                'prix' => 350.00,
                'stock' => 25,
                'description' => 'Encre noire intense sur fond papier blanc mat avec bordure passe-partout.',
                'image' => '/molimao/art-mahala-1.jpg',
                'hover' => '/molimao/art-mahala-2.jpg',
                'sizes' => ['30x40 cm', '50x70 cm'],
                'fit' => 'Format standard',
                'material' => 'Papier d’art d’archive 250g',
            ],
            [
                'nom' => 'Tirage Édition 04 — « Ptice » Façades Urbaines',
                'category' => 'Art',
                'prix' => 350.00,
                'stock' => 25,
                'description' => 'Lignes épurées et contrastes graphiques forts pour espaces intérieurs contemporains.',
                'image' => '/molimao/art-ptice-1.jpg',
                'hover' => '/molimao/art-ptice-2.jpg',
                'sizes' => ['30x40 cm', '50x70 cm'],
                'fit' => 'Format standard',
                'material' => 'Papier d’art d’archive 250g',
            ],
            [
                'nom' => 'Tirage Édition 05 — « Trafika » Esquisse d’Atelier',
                'category' => 'Art',
                'prix' => 350.00,
                'stock' => 20,
                'description' => 'Croquis d’atelier original tiré en série très limitée à 50 exemplaires numérotés.',
                'image' => '/molimao/art-trafika-1.jpg',
                'hover' => '/molimao/art-trafika-2.jpg',
                'sizes' => ['30x40 cm', '50x70 cm'],
                'fit' => 'Format standard',
                'material' => 'Papier d’art d’archive 250g',
            ],
        ];

        DB::transaction(function () use ($categories, $products): void {
            $owner = User::query()
                ->whereIn('role', ['admin', 'vendeur'])
                ->orderByRaw("CASE WHEN role = 'admin' THEN 0 ELSE 1 END")
                ->first();

            if (!$owner) {
                throw new RuntimeException(
                    'LEXIGAM catalogue import stopped: create or assign an existing admin/vendor account first. No products or categories were inserted.'
                );
            }

            $categoryModels = [];
            foreach ($categories as $name => $description) {
                $categoryModels[$name] = Categorie::firstOrCreate(
                    ['nom' => $name],
                    ['description' => $description, 'statut' => true]
                );
            }

            $created = 0;
            $existing = 0;

            foreach ($products as $item) {
                $image = self::FRONTEND_ASSET_BASE . $item['image'];
                $hover = self::FRONTEND_ASSET_BASE . $item['hover'];

                $product = Produit::firstOrCreate(
                    ['nom' => $item['nom']],
                    [
                        'description' => $item['description'],
                        'prix' => $item['prix'],
                        'stock' => $item['stock'],
                        'image' => $image,
                        'hover' => $hover,
                        'gallery' => [$image, $hover],
                        'sizes' => $item['sizes'],
                        'fit' => $item['fit'],
                        'material' => $item['material'],
                        'user_id' => $owner->id,
                        'categorie_id' => $categoryModels[$item['category']]->id,
                        'statut' => 'approved',
                    ]
                );

                $product->wasRecentlyCreated ? $created++ : $existing++;
            }

            $this->command?->info("LEXIGAM catalogue import completed. Created: {$created}; already present: {$existing}; categories: " . count($categoryModels) . '.');
        });
    }
}
