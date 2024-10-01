import { LOGIN, SIGNUP } from "./actionTypes";

// Action creators
export const signup = () => {
    return {
        type: 'SIGNUP',
        payload: 'S'
    };
};

export const login = () => {
    return {
        type: 'LOGIN',
        payload: 'L'
    };
};
