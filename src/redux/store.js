import { configureStore } from "@reduxjs/toolkit";

import allUserReducer from "./allUsersSlice";
import cartReducer from "./cartSlice";
import allProductReducer from "./allProductSlice"; // Import the product slice

export default configureStore({
  reducer: {
    allUser: allUserReducer,
    cart: cartReducer,
    products: allProductReducer, // Add the product slice to the store
  },
});
