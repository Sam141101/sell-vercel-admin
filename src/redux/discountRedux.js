import { createSlice } from "@reduxjs/toolkit";

const discountSlice = createSlice({
  name: "discount",
  initialState: {
    discounts: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    // GET ALL
    getDiscountStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getDiscountSuccess: (state, action) => {
      state.isFetching = false;
      state.discounts = action.payload;
    },

    getDiscountFailure: (state) => {
      state.isFetching = true;
      state.error = true;
    },

    // DELETE
    deleteDiscountStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteDiscountSuccess: (state, action) => {
      state.isFetching = false;
      state.discounts.splice(
        state.discounts.findIndex((item) => item._id === action.payload),
        1
      );
    },

    deleteDiscountFailure: (state) => {
      state.isFetching = true;
      state.error = true;
    },

    // UPDATE
    updateDiscountStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateDiscountSuccess: (state, action) => {
      state.isFetching = false;
      state.discounts[
        state.discounts.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.discount;
    },

    updateDiscountFailure: (state) => {
      state.isFetching = true;
      state.error = true;
    },

    // NEW
    addDiscountStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addDiscountSuccess: (state, action) => {
      state.isFetching = false;
      state.discounts.push(action.payload);
    },

    addDiscountFailure: (state) => {
      state.isFetching = true;
      state.error = true;
    },
  },
});

export const {
  getDiscountStart,
  getDiscountSuccess,
  getDiscountFailure,
  deleteDiscountStart,
  deleteDiscountSuccess,
  deleteDiscountFailure,
  updateDiscountStart,
  updateDiscountSuccess,
  updateDiscountFailure,
  addDiscountStart,
  addDiscountSuccess,
  addDiscountFailure,
} = discountSlice.actions;
export default discountSlice.reducer;
