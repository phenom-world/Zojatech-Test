import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const initialState = {
  user: {},
  token: {},
};

export const persistConfig = {
  storage: storage,
  key: "root",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginUser: (state, { payload }) => {
      state.user = payload?.data.user;
      state.token = payload?.data.token;
    },
  },
});

export const { setLoginUser } = authSlice.actions;
const { reducer } = authSlice;
export default reducer;
