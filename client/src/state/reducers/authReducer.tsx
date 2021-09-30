import { Reducer } from "redux";

interface IAuthState {
    isAuth: boolean
}
const initialState: IAuthState = {
    isAuth: !!window.localStorage.getItem('auth')
}

const reducer: Reducer = (state: IAuthState = initialState, action: any) => {
    switch (action.type) {
        case "setAuth":
            window.localStorage.setItem('auth', "true");
            return { ...state, isAuth: action.payload };
        case "logout":
            window.localStorage.removeItem('auth');
            return { ...state, isAuth: false };
    }
    return state;
}

export default reducer;