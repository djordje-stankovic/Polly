import React, { PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({component : Component, ...rest}) =>{
    return(
        <Route
        {...rest}
        render={props =>{
            if(localStorage.getItem('jwt')){
            return <Component {...props}></Component>}
            else{
                return <Redirect to="/login"/>
            }
        }}/>
    )
}
