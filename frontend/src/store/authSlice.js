import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: (() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch { return null; }
  })(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.removeItem('token');
    },
    setUser: (state, action) => {
      state.user = action.payload || null;
      if (action.payload) localStorage.setItem('user', JSON.stringify(action.payload));
      else localStorage.removeItem('user');
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { login, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
