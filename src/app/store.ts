import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import chooseReducer from "../redux/chooseSlice";
import { ongoingApi } from "../services/ongoingApi";

export const store = configureStore({
  reducer: {
    choose: chooseReducer,
    [ongoingApi.reducerPath]: ongoingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ongoingApi.middleware),
});
setupListeners(store.dispatch);
