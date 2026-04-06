import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./slices/moviesSlice";
import exploreReducer from "./slices/exploreSlice";
import trendingReducer from "./slices/trendingSlice";
import favoritesReducer from "./slices/favoritesSlice";
import movieDetailReducer from "./slices/movieDetailSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    explore: exploreReducer,
    trending: trendingReducer,
    favorites: favoritesReducer,
    movieDetail: movieDetailReducer,
  },
});

export default store;
