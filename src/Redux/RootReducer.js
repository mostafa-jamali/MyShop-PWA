import {combineReducers} from 'redux';
import basketReducer from './Basket/Basket.reducer'

export default combineReducers({
    basketList: basketReducer,
})