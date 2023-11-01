import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          ...newItem,
          totalPrice: newItem.price * newItem.quantity,
        });
      }
    },
    updateCartItemQuantity: (state, action) => {
      const { itemId, newQuantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.id === itemId);

      if (itemToUpdate) {
        itemToUpdate.quantity = newQuantity;
        itemToUpdate.totalPrice = itemToUpdate.price * newQuantity;
      }
    },
    toggleCartItemEditMode: (state, action) => {
      const itemId = action.payload;
      const itemToEdit = state.items.find((item) => item.id === itemId);

      if (itemToEdit) {
        itemToEdit.isEditing = !itemToEdit.isEditing;

        if (itemToEdit.isEditing) {
          itemToEdit.originalQuantity = itemToEdit.quantity;
        }
      }
    },
    removeItemFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== itemIdToRemove);
    },
    // ... (other reducers)
  },
});

export const {
  addToCart,
  updateCartItemQuantity,
  toggleCartItemEditMode,
  removeItemFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
