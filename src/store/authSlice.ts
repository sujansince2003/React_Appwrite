import { createSlice,PayloadAction } from "@reduxjs/toolkit";

//defining types
export interface Authstate {
  status: boolean;
  userData: any | null;
}

const initialState: Authstate = {
  status: false,
  userData: null,
};

const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state,action: PayloadAction<{ userData: any }>) => {
      (state.status = true), (state.userData = action.payload.userData);
    },
    logout: (state) => {
      (state.status = false), (state.userData = null);
    },
  },
});

export const { login, logout } = authslice.actions;  //Contains the action creators login and logout, which are used to dispatch actions from your application.

export default authslice.reducer;     //for store management



/**
 * initialState: This is the initial state of the slice. It's an object with two properties: status and userData.
 * 
state in Reducers: When a reducer function is called, it receives the current state of the slice as its first argument. This state is the same as the initialState when the application starts, but it can be updated by the reducer functions.
*
Accessing and Modifying State: Inside the reducer functions (login and logout), you can directly access and modify the status and userData properties of the state object. For example, in the login reducer, state.status is set to true, and state.userData is updated with the user data from the action's payload.
 * 
 * 
 * 
 * 
 *  an action is a plain JavaScript object that represents an intention to change the state. Actions are the only way to send data from your application to your Redux store. They are dispatched (sent) to the store, and the store then calls the reducer function with the current state and the dispatched action. The reducer function determines how the state should change in response to the action.
 * 
 * 
 * action: This is the object that is dispatched to the Redux store. It represents an intention to change the state. Actions must have a type property, and they can also carry additional data in other properties.
 * 
payload: This is a common convention in Redux for the property that carries the data needed to update the state. The payload is not a special property recognized by Redux itself; it's just a name chosen by developers. The payload can contain any data that the reducer needs to update the state.dispatch garda pathako data lina lai
*
userData: This is a property within the payload object. In the context of your authentication slice, userData would contain the data about the user who is logging in. This could be an object with properties like username, email, or any other user-related information.
 * 
 */