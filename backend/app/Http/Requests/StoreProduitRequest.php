<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProduitRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check() && in_array(auth()->user()->role, ['admin','vendeur'], true);
    }

    public function rules(): array
    {
        return [
            'nom' => ['required','string','max:255'],
            'description' => ['nullable','string','max:10000'],
            'prix' => ['required','numeric','min:0'],
            'stock' => ['required','integer','min:0'],
            'image' => ['nullable','file','mimes:jpeg,png,jpg,webp','max:5120'],
            'categorie_id' => ['required','integer','exists:categories,id'],
        ];
    }
}
