// store.js
import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './redux/moviesSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});
