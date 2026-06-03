import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Ex: [{ produit: {...}, quantite: 1 }]
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action simple pour ajouter au panier
    addToCart: (state, action) => {
      const produitExist = state.items.find(i => i.produit.id === action.payload.id);
      if (produitExist) {
        produitExist.quantite += 1;
      } else {
        state.items.push({ produit: action.payload, quantite: 1 });
      }
    },
    // Action pour supprimer un produit
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.produit.id !== action.payload);
    },
    // Action pour modifier la quantité
    updateQuantity: (state, action) => {
      const item = state.items.find(i => i.produit.id === action.payload.id);
      if (item) {
        item.quantite = action.payload.quantite;
      }
    },
    // Action simple pour vider le panier
    clearCart: (state) => {
      state.items = [];
    }
  },
});

export const { addToCart, clearCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
