import React, {useEffect, useMemo, useReducer, useRef, useState} from "react";
import './styles/App.css';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Navbar from "./components/UI/navbar/Navbar";
import AppRouter from "./components/AppRouter";
import {AuthContext, ConfirmationAlertContext} from "./context/context";
import Notiflix from "notiflix";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    useEffect(() => {
        Notiflix.Notify.init({width: '480px', position: 'center-top'});
        if (localStorage.getItem('user')) {
            setIsAuth(true);
        }
        setIsLoading(false);
    }, [])
    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading
        }}>

            <BrowserRouter>
                <Navbar/>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
