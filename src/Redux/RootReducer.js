import { combineReducers } from 'redux';
import basketReducer from './Basket/Basket.reducer'
import favoriteReducer from './Favorites/Favorites.reducer'
import authReducer from './auth/auth.reducer'

export default combineReducers({
    basketList: basketReducer,
    favoriteList: favoriteReducer,
    auth:authReducer
})