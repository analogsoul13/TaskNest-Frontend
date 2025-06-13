import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import appliedJobsReducer from "../redux/slices/appliedJobsSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
  auth: authReducer,
  appliedJobs: appliedJobsReducer,
});

const persistedReducer = persistReducer({ key: "root", storage }, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
    }),
});

export const persistor = persistStore(store);
export default store;
