<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateLivraisonRequest extends FormRequest
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
            'adresse' => 'sometimes|string',
            'ville' => 'sometimes|string',
            'telephone' => 'sometimes|string',
            'statut' => 'sometimes|string',
            'date_livraison' => 'sometimes|date'
        ];
    }
}
