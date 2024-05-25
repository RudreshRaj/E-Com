import { configureStore } from "@reduxjs/toolkit";
import cartOrderReducer from "./features/cartSlice";
export const store: any = configureStore({
  reducer: {
    cartOrderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
