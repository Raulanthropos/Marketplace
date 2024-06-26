import { SET_ACCESS_TOKEN, SET_IS_LOGGED_IN, SET_USER } from "../actions";

const initialState = {
    accessToken: null,
    isLoggedIn: false,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ACCESS_TOKEN:
            console.log("Payload", action.payload);
            return {...state, accessToken: action.payload };
        case SET_IS_LOGGED_IN:
            console.log("Payload", action.payload);
            return {...state, isLoggedIn: action.payload };
        case SET_USER:
            console.log("Payload", action.payload);
            return {...state, user: action.payload };
        default:
            return state;
    }
}