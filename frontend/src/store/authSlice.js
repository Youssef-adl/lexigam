import { createSlice } from '@reduxjs/toolkit';

// État initial très simple
const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action pour se connecter
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token); // Sauvegarde token
      localStorage.setItem('user', JSON.stringify(action.payload.user)); // Sauvegarde user
    },
    // Action pour se déconnecter
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); // Suppression
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
