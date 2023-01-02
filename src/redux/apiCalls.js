import { loginFailure, loginStart, loginSuccess } from "./userRedux";
// import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductFailure,
  addProductSuccess,
  addProductStart,
} from "./productRedux";
import axios from "axios";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUserFailure,
  getUserStart,
  getUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "./usersRedux";

export const login = async (dispatch, user, navigate) => {
  dispatch(loginStart());

  try {
    const res = await axios.post("https://sell-vercel.vercel.app/api/auth/login", user);
    dispatch(loginSuccess(res.data));
    // navigate("/home");
  } catch (err) {
    dispatch(loginFailure());
  }
};

// ------------- User -------------
export const getUsers = async (dispatch, token) => {
  dispatch(getUserStart());

  try {
    const res = await axios.get("https://sell-vercel.vercel.app/api/users/", {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};

export const updateUser = async (token, dispatch, id, update) => {
  dispatch(updateUserStart());

  try {
    const res = await axios.put(
      `https://sell-vercel.vercel.app/api/users/${id}`,
      update,
      {
        headers: { token: `Bearer ${token}` },
      }
    );
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    dispatch(updateUserFailure());
    console.log(err);
  }
};

export const deleteUser = async (id, dispatch, token) => {
  dispatch(deleteUserStart());

  try {
    await axios.delete(`https://sell-vercel.vercel.app/api/users/${id}`, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

// ------------- Product -------------
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());

  try {
    const res = await axios.get("https://sell-vercel.vercel.app/api/products");
    dispatch(getProductSuccess(res.data.resultProducts));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch, token) => {
  dispatch(deleteProductStart());

  try {
    // const res = await axios.delete(`http://localhost:5000/api/products/${id}`, {
    await axios.delete(`https://sell-vercel.vercel.app/api/products/${id}`, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch, token) => {
  dispatch(updateProductStart());

  try {
    const res = await axios.put(
      `https://sell-vercel.vercel.app/api/products/${id}`,
      product,
      {
        headers: { token: `Bearer ${token}` },
      }
    );
    // dispatch(updateProductSuccess({ id, product }));
    dispatch(updateProductSuccess(id, res.data));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (product, dispatch, token) => {
  dispatch(addProductStart());

  try {
    const res = await axios.post(
      "https://sell-vercel.vercel.app/api/products",
      product,
      {
        headers: { token: `Bearer ${token}` },
      }
    );
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};
