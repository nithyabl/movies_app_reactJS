import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTrendingMovies } from "../../appwrite";

export const fetchTrending = createAsyncThunk(
  "trending/fetchTrending",
  async (_, { rejectWithValue }) => {
    try {
      const movies = await getTrendingMovies();
      return movies || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const trendingSlice = createSlice({
  name: "trending",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrending.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchTrending.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch trending movies";
      });
  },
});

export default trendingSlice.reducer;
