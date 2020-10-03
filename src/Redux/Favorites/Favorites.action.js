import types from './Favorites.types';


export const addFavorite = (favorite) => {
    return {
        type: types.ADD_FAVORITE,
        payload: favorite
    }
}
export const deleteFavorite = (id) => {
    return {
        type: types.DELETE_FAVORITE,
        payload: id
    }
}