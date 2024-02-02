import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "../utils/api";

// Async thunk
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getProducts(); // Fetch data.
      return data;
    } catch (error) {
      return rejectWithValue({ errorMessage: error.toString() }); // Handle error.
    }
  }
);

// Slice
const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  // Extra reducers for async actions
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.errorMessage;
      });
  },
});

export default productsSlice.reducer;
