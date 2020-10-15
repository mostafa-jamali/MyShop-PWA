import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import RootReducer from './RootReducer';

const middlewares = [thunk, logger];

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["basketList","favoriteList"]
}

const persistedReducer = persistReducer(persistConfig, RootReducer)

const store = createStore(
    persistedReducer,
    applyMiddleware(...middlewares)
)
export default store;

export const persistor = persistStore(store)