import { configureStore } from '@reduxjs/toolkit'
import  blogpostSlice  from './features/blogpostSlice'
import  todoSlice  from './features/todoSlice'
import userSlice  from './features/userSlice'
import appApi from './appApi';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

const reducers = combineReducers({
    user: userSlice,
    post: blogpostSlice,
    todo: todoSlice,
    [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [appApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, appApi.middleware],

});

export default store;