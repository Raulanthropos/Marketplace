// src/store/redux/store.js

import { configureStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { encryptTransform } from 'redux-persist-transform-encrypt';

import authReducer from './reducers/authReducer';

const persistConfig = {
    key: 'root',
    storage,
    transforms: [
        encryptTransform({
            secret: process.env.REACT_APP_SECRET,
            encrypt: true,
            decrypt: true,
        }),
    ],
};

const rootReducer = combineReducers({
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore(persistedReducer);
export const persistor = persistStore(store);