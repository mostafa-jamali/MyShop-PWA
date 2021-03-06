import types from './Basket.types';


export const addBasket = (basket) => {
    return {
        type: types.ADD_BASKET,
        payload: basket
    }
}
export const increaseItemOfBasket = (id) => {
    return {
        type: types.INCREASE_ITEM_BASKET,
        payload: id
    }
}
export const decreaseItemOfBasket = (id) => {
    return {
        type: types.DECREASE_ITEM_BASKET,
        payload: id
    }
}

export const deleteBasket = (id) => {
    return {
        type: types.DELETE_BASKET,
        payload: id
    }
}