import types from './auth.types'
const initial_state = {
    user: null,
    token: "",
    pending: false,
    errors: null
}
const authReducer = (state = initial_state, { type, payload }) => {
    switch (type) {
        case (types.LOGIN_START):
        case (types.LOGOUT_START):
        case (types.REGISTER_START):
            return {
                ...state,
                pending: true,
                errors: null,
            }
        case (types.LOGIN_SUCCESS):
        case (types.REGISTER_SUCCESS):
            return {
                ...state,
                pending: false,
                user: payload.user,
                token: payload.token
            }
        case (types.LOGOUT_SUCCESS):
            return initial_state
        case (types.LOGOUT_FAIL):
        case (types.LOGIN_FAIL):
        case (types.REGISTER_FAIL):
            return {
                ...state,
                pending: false,
                errors: payload,
            }
        default:
            return state
    }
}
export default authReducer;