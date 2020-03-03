import axios from "axios";

import {
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    GET_PRODUCT,
    PRODUCT_LOADING,
    GET_PRODUCTS,
    PRODUCTS_LOADING
} from "./types";

// Create Product
export const createProject = productData => dispatch => {
    axios
        .post("/api/products/create", productData)
        .then(res =>
            dispatch({
                type: CREATE_PRODUCT,
                payload: res.data
            })
        )
        .catch(err => console.log(err));
};

// Update Product
export const updateProduct = productData => dispatch => {
    axios
        .patch("/api/products/update", productData)
        .then(res =>
            dispatch({
                type: UPDATE_PRODUCT,
                payload: res.data
            })
        )
        .catch(err => console.log(err));
};

// Delete Product
export const deleteProduct = (id, history) => dispatch => {
    axios
        .delete(`/api/product/delete/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_PRODUCT,
                payload: id
            })
        )
        .then(res => history.push("/dashboard"))
        .catch(err => console.log(err));
};

// Get specific product by id
export const getProduct = id => dispatch => {
    dispatch(setProductLoading());
    axios
        .get(`/api/products/${id}`)
        .then(res =>
            dispatch({
                type: GET_PRODUCT,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PRODUCT,
                payload: null
            })
        );
};

// Get all products for specific user
export const getProducts = () => dispatch => {
    dispatch(setProductsLoading());
    axios
        .get("/api/products")
        .then(res =>
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PRODUCTS,
                payload: null
            })
        );
};

// Product loading
export const setProductLoading = () => {
    return {
        type: PRODUCT_LOADING
    };
};

// Products loading
export const setProductsLoading = () => {
    return {
        type: PRODUCTS_LOADING
    };
};