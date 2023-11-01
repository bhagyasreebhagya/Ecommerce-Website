// productSlice.js

import { createSlice } from "@reduxjs/toolkit";

const products = JSON.parse(localStorage.getItem("products"));
console.log(products);

const initialState = {
  products: [...products],
};

const productSlice = createSlice({
  name: "allProducts",
  initialState,

  reducers: {
    addProduct: (state, action) => {
      // Add the new product to the products array.
      state.products.push(action.payload);
    },
    editProduct: (state, action) => {
      // Find the product by ID and update it
      const { id, updatedProduct } = action.payload;
      const productIndex = state.findIndex((product) => product.id === id);
      if (productIndex !== -1) {
        state[productIndex] = updatedProduct;
      }
    },
    deleteProduct: (state, action) => {
      // Find and remove the product by ID
      const id = action.payload;
      const productIndex = state.findIndex((product) => product.id === id);
      if (productIndex !== -1) {
        state.splice(productIndex, 1);
      }
    },
  },
});

export const { addProduct, editProduct, deleteProduct } = productSlice.actions;

export default productSlice.reducer;
