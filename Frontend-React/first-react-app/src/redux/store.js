import { createStore } from "redux";
import userReducer from "./userSlice";

const store = createStore(userReducer)
export default store;