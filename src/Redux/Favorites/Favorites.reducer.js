const initialState = {
    favorite_list: [
        // {
        //     id: 668,
        //     name: "شامپو مو فابریگاس مدل Pepper حجم 400 میلی لیتر",
        //     images: [
        //         { id: 669, src: "https://woocommerce.maktabsharif.ir/wp-content/uploads/2020/01/2901431.jpg" }
        //     ],
        //     favStatus: false
        // },
    ]
}
const favoriteReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ("ADD_FAVORITE"):
            return {
                ...state,
                favorite_list: [...state.favorite_list, payload]
            }
        case ("DELETE_FAVORITE"):
            return {
                ...state,
                favorite_list: state.favorite_list.filter(item => item.id !== payload)
            }
        default:
            return state;
    }
}
export default favoriteReducer;