import { createSlice } from '@reduxjs/toolkit';

const initialState = { items: [] };

const unwrapProduct = (value) => value?.produit?.produit || value?.produit || value;
const safeQuantity = (value) => {
  const quantity = Number(value ?? 1);
  return Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 1;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Supports addToCart(product) and addToCart({ produit, quantite, taille }).
      const product = unwrapProduct(action.payload);
      if (!product || product.id == null) return;

      const quantity = safeQuantity(action.payload?.quantite);
      const existing = state.items.find((item) => String(item.produit?.id) === String(product.id));
      if (existing) {
        existing.quantite = safeQuantity(existing.quantite) + quantity;
        if (action.payload?.taille) existing.taille = action.payload.taille;
      } else {
        state.items.push({
          produit: product,
          quantite: quantity,
          taille: action.payload?.taille || 'M',
        });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => String(item.produit?.id) !== String(action.payload));
    },
    updateQuantity: (state, action) => {
      const item = state.items.find((entry) => String(entry.produit?.id) === String(action.payload.id));
      if (item) item.quantite = safeQuantity(action.payload.quantite);
    },
    clearCart: (state) => { state.items = []; },
  },
});

export const { addToCart, clearCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
