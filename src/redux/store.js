import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import appliedJobsReducer from "../redux/slices/appliedJobsSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        appliedJobs: appliedJobsReducer,
    },
});

export default store;
