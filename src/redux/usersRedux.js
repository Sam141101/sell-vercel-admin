import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    // GET
    getUserStart: (state) => {
      state.isFetching = true;
    },
    getUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    getUserFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },

    // UPDATE
    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },

    updateUserFailure: (state) => {
      state.isFetching = true;
      state.error = true;
    },

    // UPDATE
    deleteUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.splice(
        state.users.findIndex((item) => item._id === action.payload),
        1
      );
    },

    deleteUserFailure: (state) => {
      state.isFetching = true;
      state.error = true;
    },
  },
});

export const {
  getUserStart,
  getUserSuccess,
  getUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} = usersSlice.actions;
export default usersSlice.reducer;
