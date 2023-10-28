import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasStatus",
  async (params) => {
    const { search, category, currentPage, sortType, sortOrder } = params;
    const { data } = await axios.get(
      `https://6537fe50a543859d1bb11d97.mockapi.io/pizzas?page=${currentPage}&limit=4&${search}&${category}&sortBy=${sortType}&order=${sortOrder}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading", // loading | success | error
};

export const pizzaSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    }
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
