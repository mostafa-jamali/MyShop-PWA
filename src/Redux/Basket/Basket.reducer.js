const initialState = {
    basket_list: [
        // {
        //     id: 668,
        //     name: "شامپو مو فابریگاس مدل Pepper حجم 400 میلی لیتر",
        //     images: [
        //         { id: 669, src: "https://woocommerce.maktabsharif.ir/wp-content/uploads/2020/01/2901431.jpg" }
        //     ],
        //     on_sale: true,
        //     regular_price: "29000",
        //     sale_price: "18850",
        // },
    ]
}
const basketReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ("ADD_BASKET"):
            return {
                ...state,
                basket_list: [...state.basket_list, payload]
            }
        case ("DELETE_BASKET"):
            return {
                ...state,
                basket_list: state.basket_list.filter(item => item.id !== payload)
            }
        case ("EDIT_BASKET"):
            return {
                ...state,
                basket_list: state.basket_list.map(item => item.id == payload.id ? payload : item)
            }
        default:
            return state;
    }
}
export default basketReducer;