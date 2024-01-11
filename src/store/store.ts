import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "../features/profile/userSlice";
import linksReducer from "../features/links/linksSlice";

const rootReducer = combineReducers({
  user: UserReducer,
  links: linksReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
