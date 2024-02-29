import { createSlice,PayloadAction } from "@reduxjs/toolkit";

//defining types
interface Authstate {
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

export const { login, logout } = authslice.actions;

export default authslice.reducer;
