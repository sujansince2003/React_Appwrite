import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;



/**
 * he primary purpose of creating a store.ts (or similar) file in a Redux application is to centralize the state management of your application
 * 
 * we have defined initialState variable which contains property state and userData. so there state changes continously
 * to access their value or use in our app we need store. to access them  in components::
 *         const { status, userData } = useSelector((state) => state.auth);
 * state.auth.status, state.auth.userData or destruct them
 * 
 * 
 * 
 * 
 */




 