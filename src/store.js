import { configureStore } from '@reduxjs/toolkit';
import builderReducer from "./features/builder/builderSlice.js";

export const store = configureStore({
    reducer: {
        workout:builderReducer,
    },
});