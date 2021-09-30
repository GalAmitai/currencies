import { Dispatch } from "redux"

export const setAuth = (status: boolean) => {
    return (dispatch: Dispatch) => {
        dispatch({ type: 'setAuth', payload: status })
    }
}

export const logout = () => {
    return (dispatch: Dispatch) => {
        dispatch({ type: 'logout' })
    }
}