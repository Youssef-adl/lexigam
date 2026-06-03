<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreLivraisonRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'commande_id' => 'required|exists:commandes,id',
            'adresse' => 'required|string',
            'ville' => 'required|string',
            'telephone' => 'required|string',
            'statut' => 'required|string',
            'date_livraison' => 'nullable|date'
        ];
    }
}
