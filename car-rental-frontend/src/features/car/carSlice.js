// src/features/cars/carSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching visible cars from backend
export const fetchVisibleCars = createAsyncThunk(
  'cars/fetchVisibleCars',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/api/cars/visible');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error fetching cars');
    }
  }
);

const carSlice = createSlice({
  name: 'cars',
  initialState: {
    cars: [],
    loading: false,
    error: null,
  },
  reducers: {
    // You can add synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisibleCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVisibleCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchVisibleCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch cars';
      });
  },
});

export default carSlice.reducer;
