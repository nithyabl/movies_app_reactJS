import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
const loadFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  } catch {
    return [];
  }
};

const saveFavorites = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    list: loadFavorites(),
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const exists = state.list.find((f) => f.id === movie.id);
      if (exists) {
        state.list = state.list.filter((f) => f.id !== movie.id);
      } else {
        state.list.push(movie);
      }
      saveFavorites(state.list);
    },
    clearFavorites: (state) => {
      state.list = [];
      saveFavorites([]);
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;

// Selectors
export const selectIsFavorited = (state, movieId) =>
  state.favorites.list.some((f) => f.id === movieId);

export default favoritesSlice.reducer;
