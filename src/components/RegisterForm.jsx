import AuthService from '../API/AuthService'
import MyButton from './UI/button/MyButton'
import MyInput from './UI/input/MyInput'
import React, {useState} from "react";

import '../styles/App.css';
import ConfirmButton from './UI/button/ConfirmButton';
import Notiflix from 'notiflix';
import userEvent from '@testing-library/user-event';

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"/>

const RegisterForm = ({register}) => {

    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const registerUser = async (e) => {
        e.preventDefault();
        try {
            await AuthService.register(newUser.firstName, newUser.lastName, newUser.email, newUser.password);
            register();
            Notiflix.Notify.success('Registration was successful, Confirmation email was sent to ' + newUser.email);
            setNewUser({firstName: '', lastName: '', email: '', password: ''});
        } catch (error) {
            Notiflix.Notify.failure('Registration error, please try again');
        }
    }

    return (
        <form className="newTaskForm">
            
            <h3 style={{textAlign: 'center', marginBottom:10}}>
                <strong>Sing Up</strong>
            </h3>
            <div>
                <MyInput
                    value={newUser.firstName}
                    onChange={e => setNewUser({...newUser, firstName: e.target.value})}
                    type="text"
                    placeholder="First Name"/>
            </div>
            <div>
                <MyInput
                    value={newUser.lastName}
                    onChange={e => setNewUser({...newUser, lastName: e.target.value})}
                    type="text"
                    placeholder="Last Name"/>
            </div>
            <div>
                <MyInput
                    value={newUser.email}
                    onChange={e => setNewUser({...newUser, email: e.target.value})}
                    type="text"
                    placeholder="Email"/>
            </div>
            <div>
                <MyInput
                    value={newUser.password}
                    onChange={e => setNewUser({...newUser, password: e.target.value})}
                    type="password"
                    placeholder="Password"/>
            </div>
            <div>
                <ConfirmButton style={{width: '100%', marginTop: 35}} onClick={registerUser}> Register </ConfirmButton>
            </div>
        </form>
    )
}

export default RegisterForm