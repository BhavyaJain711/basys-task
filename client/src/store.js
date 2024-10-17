import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./state";
import {persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER} from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'minorProject',
    storage
}

// const reducer = persistReducer({ users: authReducer })

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools:false,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
const persistedStore = persistStore(store);

export { store, persistedStore }