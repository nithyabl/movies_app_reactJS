import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovieDetail } from "../../services/tmdbApi";

export const fetchDetail = createAsyncThunk(
  "movieDetail/fetchDetail",
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchMovieDetail(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const movieDetailSlice = createSlice({
  name: "movieDetail",
  initialState: {
    movie: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearDetail: (state) => {
      state.movie = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movie = action.payload;
      })
      .addCase(fetchDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch movie details";
      });
  },
});

export const { clearDetail } = movieDetailSlice.actions;
export default movieDetailSlice.reducer;
