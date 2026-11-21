<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProduitRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check() && in_array(auth()->user()->role, ['admin','vendeur'], true);
    }

    public function rules(): array
    {
        return [
            'nom' => ['sometimes','string','max:255'],
            'description' => ['sometimes','nullable','string','max:10000'],
            'prix' => ['sometimes','numeric','min:0'],
            'stock' => ['sometimes','integer','min:0'],
            'image' => ['sometimes','nullable','file','mimes:jpeg,png,jpg,webp','max:5120'],
            'hover' => ['sometimes','nullable','string','max:2048'],
            'gallery' => ['sometimes','nullable','array','max:8'],
            'gallery.*' => ['string','max:2048'],
            'sizes' => ['sometimes','nullable','array','max:12'],
            'sizes.*' => ['string','max:30'],
            'fit' => ['sometimes','nullable','string','max:255'],
            'material' => ['sometimes','nullable','string','max:255'],
            'categorie_id' => ['sometimes','integer','exists:categories,id'],
        ];
    }
}
