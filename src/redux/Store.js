import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/CartSlice";
import favouriteReducer from "./slice/FavouriteSlice";
const store = configureStore({
  reducer: {
    favourite: favouriteReducer,
    cart: cartReducer,
  },
});
export default store;
