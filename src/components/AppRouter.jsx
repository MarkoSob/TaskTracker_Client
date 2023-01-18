import React from 'react'
import {Route, Routes, Navigate} from "react-router-dom";
import {publicRoutes, authorizedRoutes} from '../router/Routes';
import {useContext} from 'react';
import {AuthContext} from '../context/context';
import Loader from './UI/loader/Loader';

const AppRouter = () => {

    const {isAuth, isLoading} = useContext(AuthContext);

    if (isLoading) {
        return <Loader/>
    }

    return (
        isAuth
            ?
            <Routes>
                {/* <Route exact path = "/about" element={<About/>}/>
         <Route path="*" element={<Navigate to="/about" replace />}
        /> */}
                {authorizedRoutes.map(route =>
                    <Route
                        key={route.path}
                        exact={route.exact}
                        path={route.path}
                        element={route.element}
                    />
                )}
                <Route path="/login" element={<Navigate to="/tasks" replace/>}/>
                <Route path="/" element={<Navigate to="/tasks" replace/>}/>
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        key={route.path}
                        exact={route.exact}
                        path={route.path}
                        element={route.element}
                    />
                )}
                <Route path="*" element={<Navigate to="/login" replace/>}
                />
            </Routes>
    )
}
export default AppRouter