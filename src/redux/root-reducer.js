import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import { authApi, organizationApi } from "./services";

import authReducer, { persistConfig } from "./slices/auth";
import modalReducer from "./modal/modalRedux";

export const reducers = combineReducers({
  authStore: persistReducer(persistConfig, authReducer),
  [authApi.reducerPath]: authApi.reducer,
  [organizationApi.reducerPath]: organizationApi.reducer,
  modalReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    localStorage.clear();
    return reducers(undefined, action);
  }
  return reducers(state, action);
};
