import {useContext} from 'react'
import AuthService from '../API/AuthService'
import MyButton from '../components/UI/button/MyButton'
import MyInput from '../components/UI/input/MyInput'
import {ConfirmationAlertContext} from '../context/context'
import React, {useState} from "react";
import '../styles/App.css';
import {useNavigate} from "react-router-dom";

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"/>

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const {isAlertVisible, setIsAlertVisible} = useContext(ConfirmationAlertContext);

    const sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time)
        )
    }

    const resetPassword = async(event) => {
        event.preventDefault();
        AuthService.resetPassword(email);
        setIsAlertVisible(true);
        navigate('/login');
        await sleep(2000);
        setIsAlertVisible(false);
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    return (
        <div>
            <form onSubmit={resetPassword}>
                <MyInput type="text" placeholder="Email" onChange={onChangeEmail}/>
                <MyButton style={{marginLeft: 0}}>Reset</MyButton>
            </form>
        </div>
    )
}

export default PasswordReset