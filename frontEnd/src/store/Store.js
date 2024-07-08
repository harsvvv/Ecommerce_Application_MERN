import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Assuming userSlice.js is correctly defined

const rootReducer = combineReducers({
    user: userReducer
});

export const store = configureStore({
    reducer: rootReducer,
    
});

export default store;
