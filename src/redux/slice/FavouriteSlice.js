import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favourites: [],
};

const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    toggleFav: (state, action) => {
      const item = action.payload;
      const exists = state.favourites.find((f) => f.id === item.id);

      if (exists) {
        // ✅ already fav — remove it
        state.favourites = state.favourites.filter((f) => f.id !== item.id);
      } else {
        // ✅ not fav — add it
        state.favourites.push(item);
      }
    },
  },
});

export const { toggleFav } = favouriteSlice.actions;
export default favouriteSlice.reducer;
