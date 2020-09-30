import types from './Basket.types';


export const addBasket = (basket) => {
    return {
        type: types.ADD_BASKET,
        payload: basket
    }
}
export const deleteBasket = (id) => {
    return {
        type: types.DELETE_BASKET,
        payload: id
    }
}
export const editBasket = (basket) => {
    return {
        type: types.EDIT_BASKET,
        payload: basket
    }
}
