// src/store/redux/store.js

import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

import authReducer from "../reducers/index";
import { thunk } from "redux-thunk";

// const persistConfig = {
//   key: "root",
//   storage,
//   transforms: [
//     encryptTransform({
//       secret: "super secret",
//       encrypt: true,
//       decrypt: true,
//     }),
//   ],
// };

const rootReducer = combineReducers({
  auth: authReducer,
});

const reducer = persistReducer(
  {
    key: "root",
    storage,
    transforms: [
      encryptTransform({
        secretKey: process.env.REACT_APP_SECRET,
        onError: function (error) {
          // Handle the error.
        },
      }),
    ],
  },
  rootReducer
);

// Combine reducers and apply middleware
const store = createStore(reducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
