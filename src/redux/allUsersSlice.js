import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("userData"));

const initialState = {
  users: [...user],
  isLoggedIn: false,
  loggedUser: {},
};

const allUserSlice = createSlice({
  name: "allUser",
  initialState,
  reducers: {
    setAllUsers: ({ users }, action) => {
      users = [...users, action.payload];
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    editUser: (state, action) => {
      const { id, updatedData } = action.payload;
      // Create a new array with the updated user
      state.users = state.users.map((user) => {
        if (user.id === id) {
          return { ...user, ...updatedData };
        }
        return user;
      });
    },
    blockUser: (state, action) => {
      const userId = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        state.users[userIndex].blocked = true;
      }
    },
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.loggedUser = action.payload;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.loggedUser = {};
    },
  },
});

export const {
  setAllUsers,
  addUser,
  editUser,
  blockUser,
  loginUser,
  logoutUser,
} = allUserSlice.actions;
export default allUserSlice.reducer;
