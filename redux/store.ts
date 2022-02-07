import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/userReducer";
import listUserReducer from "./reducers/listUserReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    list: listUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
