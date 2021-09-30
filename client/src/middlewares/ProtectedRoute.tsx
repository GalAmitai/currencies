import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export const ProtectedRoute: FunctionComponent<any> = ({
    component: Component,
    ...rest
}) => {
    const state: any = useSelector((state) => state);
    const isAuthenticated = state.auth.isAuth;
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
}

export default ProtectedRoute;