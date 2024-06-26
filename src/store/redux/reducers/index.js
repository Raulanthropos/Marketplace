import { SET_ACCESS_TOKEN, SET_IS_LOGGED_IN } from "../actions";

const initialState = {
    accessToken: null,
    isLoggedIn: false,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ACCESS_TOKEN:
            return {...state, accessToken: action.payload };
        case SET_IS_LOGGED_IN:
            return {...state, isLoggedIn: action.payload };
        default:
            return state;
    }
}