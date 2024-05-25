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
      state.cartList.push(action.payload);
    },
    removeCart: (state, action: PayloadAction<ProductInfo>) => {
      state.cartList = state.cartList.filter(
        (item) => item.id !== action.payload.id
      );
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
  setCurrentCategory,
  removeCurrentCategory,
} = workspaceSlice.actions;
let cartOrderReducer = workspaceSlice.reducer;
export default cartOrderReducer;
