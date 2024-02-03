import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "../utils/api";

// Check cache and fetch data with async thunk 
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    const cache = localStorage.getItem("products");
    
    if (cache) return JSON.parse(cache) // Return cache data
    
    try {
      const data = await getProducts(); // Fetch data
      localStorage.setItem("products", JSON.stringify(data)); 
      return data;
    } catch (error) {
      return rejectWithValue(error); 
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
