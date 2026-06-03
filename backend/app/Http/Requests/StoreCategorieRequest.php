<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCategorieRequest extends FormRequest
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
            'nom' => 'required|string|max:255|unique:categories,nom',
            'description' => 'nullable|string',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,webp|max:5120',
            'statut' => 'required|boolean',
            'parent_id' => 'nullable|exists:categories,id'
        ];
    }
}
