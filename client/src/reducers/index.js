import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import productsReducer from "./productsReducer";
import tasksReducer from "./tasksReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    products: productsReducer,
    tasks: tasksReducer
});