import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_BASE_URL from "../../config";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await fetch(`${API_BASE_URL}`);
  const data = await response.json();
  return data.Movies.map((movie) => ({
    id: movie._id,
    title: movie.title,
    image: movie.image,
    type: (movie.type || "").split(",").map((type) => type.trim()),
    date: movie.date
      ? new Date(movie.date).toISOString()
      : new Date().toISOString(), // Convert Date to ISO string
  }));
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    items: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.items = action.payload.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        state.status = "success";
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default moviesSlice.reducer;
