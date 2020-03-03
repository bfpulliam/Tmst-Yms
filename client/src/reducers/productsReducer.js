import {
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    GET_PRODUCT,
    PRODUCT_LOADING,
    GET_PRODUCTS,
    PRODUCTS_LOADING
} from "../actions/types";

const initialState = {
    products: [],
    product: [],
    productLoading: false,
    productsLoading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_PRODUCT:
            return {
                ...state,
                products: [action.payload, ...state.products]
            };
        case UPDATE_PRODUCT:
            let index = state.products.findIndex(
                product => product._id === action.payload._id
            );

            state.products.splice(index, 1);

            return {
                ...state,
                products: [action.payload, ...state.products]
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(
                    product => product._id !== action.payload
                )
            };
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload,
                productLoading: false
            };
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                productsLoading: false
            };
        case PRODUCT_LOADING:
            return {
                ...state,
                productLoading: true
            };
        case PRODUCTS_LOADING:
            return {
                ...state,
                productsLoading: true
            };
        default:
            return state;
    }
}