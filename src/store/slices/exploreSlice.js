import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMoviesByCategory } from "../../services/tmdbApi";

export const fetchExploreMovies = createAsyncThunk(
  "explore/fetchExploreMovies",
  async ({ category, page }, { rejectWithValue }) => {
    try {
      const data = await fetchMoviesByCategory(category, page);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const exploreSlice = createSlice({
  name: "explore",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    activeCategory: "now_playing",
    page: 1,
    totalPages: 1,
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExploreMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExploreMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload.results || [];
        state.totalPages = action.payload.total_pages || 1;
      })
      .addCase(fetchExploreMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch movies";
      });
  },
});

export const { setActiveCategory, setPage } = exploreSlice.actions;
export default exploreSlice.reducer;
