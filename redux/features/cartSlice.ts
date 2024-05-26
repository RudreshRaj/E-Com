import { ProductInfo } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the initial state
interface ReduxStoreList {
  cartList: ProductInfo[];
  currentCategory: string;
}
// Define the initial state
const initialState: ReduxStoreList = { cartList: [], currentCategory: "" };

// Create a slice
const workspaceSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<ProductInfo>) => {
      state.cartList.push({ ...action.payload, cart_id: new Date().getTime() });
    },
    removeCart: (state, action: PayloadAction<number>) => {
      state.cartList = state.cartList.filter(
        (item) => item.cart_id != action.payload
      );
    },
    emptyCart: (state, action: PayloadAction) => {
      state.cartList = [];
    },
    setCurrentCategory: (state, action: PayloadAction<string>) => {
      state.currentCategory = action.payload;
    },
    removeCurrentCategory: (state, action: PayloadAction<string>) => {
      state.currentCategory = "";
    },
  },
});

// Extract the action creators and reducer
export const {
  addCart,
  removeCart,
  emptyCart,
  setCurrentCategory,
  removeCurrentCategory,
} = workspaceSlice.actions;
let cartOrderReducer = workspaceSlice.reducer;
export default cartOrderReducer;
