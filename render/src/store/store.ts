import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./modules/counter";
import loginReducer from "./modules/login";

const store = configureStore({
  reducer: {
    counterReducer,
    loginReducer,
  },
});

export default store;
