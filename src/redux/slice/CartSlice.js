import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ Add item — already exists-ஆ quantity increase
    addToCart: (state, action) => {
      const item = action.payload;
      const exists = state.cartItems.find((c) => c.id === item.id);
      if (exists) {
        exists.quantity += 1; // already in cart — quantity++
      } else {
        state.cartItems.push({ ...item, quantity: 1 }); // new item
      }
    },

    // ✅ Remove item
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((c) => c.id !== action.payload);
    },

    // ✅ Increase quantity
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((c) => c.id === action.payload);
      if (item) item.quantity += 1;
    },

    // ✅ Decrease quantity
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((c) => c.id === action.payload);
      if (item) {
        if (item.quantity === 1) {
          // quantity 1-ஆ இருந்தா remove
          state.cartItems = state.cartItems.filter(
            (c) => c.id !== action.payload
          );
        } else {
          item.quantity -= 1;
        }
      }
    },

    // ✅ Clear entire cart
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
