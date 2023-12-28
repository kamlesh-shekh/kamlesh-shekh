import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./CrudeSlice";

const Store = configureStore({
  reducer: {
    storeData: itemSlice.reducer,
  },
});

export default Store;
