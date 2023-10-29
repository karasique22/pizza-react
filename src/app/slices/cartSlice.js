import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  totalPizzas: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice += action.payload.price;
      state.totalPizzas += 1;
    },
    removeItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem.count == 1) {
        state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      } else {
        findItem.count--;
      }

      state.totalPrice -= action.payload.price;
      state.totalPizzas -= 1;
    },
    removeAllItems(state, action) {
      const removedItem = state.items.find(
        (obj) => obj.id === action.payload.id
      );
      state.totalPizzas -= removedItem.count;
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      state.totalPrice -= action.payload.price * removedItem.count;
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalPizzas = 0;
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectCartItem = (itemId) => (state) =>
  state.cart.items.find((obj) => obj.id === itemId)

export const { addItem, removeItem, removeAllItems, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
