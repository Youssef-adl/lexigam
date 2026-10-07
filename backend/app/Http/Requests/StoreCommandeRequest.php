<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCommandeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->role === 'client';
    }

    public function rules(): array
    {
        return [
            'items' => ['required','array','min:1'],
            'items.*.id' => ['required','integer','exists:produits,id'],
            'items.*.quantite' => ['required','integer','min:1','max:20'],
            'adresse' => ['required','string','max:500'],
            'ville' => ['required','string','max:120'],
            'telephone' => ['required','string','max:30'],
            'payment_mode' => ['required','in:cash,delivery'],
        ];
    }
}
