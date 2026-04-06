import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDiscoverMovies, fetchSearchMovies } from "../../services/tmdbApi";
import { updateSearchCount } from "../../appwrite";

// Thunk: fetch movies (discover or search)
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (query = "", { rejectWithValue }) => {
    try {
      let results;
      if (query) {
        results = await fetchSearchMovies(query);
        // Track search in Appwrite
        if (results.length > 0) {
          await updateSearchCount(query, results[0]);
        }
      } else {
        results = await fetchDiscoverMovies();
      }
      return results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    searchTerm: "",
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch movies";
      });
  },
});

export const { setSearchTerm } = moviesSlice.actions;
export default moviesSlice.reducer;
