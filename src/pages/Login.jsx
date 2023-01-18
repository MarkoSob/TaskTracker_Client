import {useContext} from 'react'
import AuthService from '../API/AuthService'
import MyButton from '../components/UI/button/MyButton'
import {AuthContext} from '../context/context'
import React, {useState} from "react";
import '../styles/App.css';
import MyModal from '../components/UI/mymodal/MyModal'
import PasswordResetForm from '../components/PasswordResetForm'
import ConfirmButton from '../components/UI/button/ConfirmButton'
import Notiflix from 'notiflix'
import RegistrationForm from '../components/RegistrationForm'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const [registerModal, setRegisterModal] = useState(false);
    const [resetPasswordModal, setResetPasswordModal] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await AuthService.login(login, password);
            setIsAuth(true);
        } catch (error) {
            Notiflix.Notify.failure('The email address or password is incorrect, or the user does not exist. Please try again.');
        }
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const onChangeLogin = (event) => {
        setLogin(event.target.value);
    }

    const register = () => {
        setRegisterModal(false);
    }

    const resetPassword = () => {
        setResetPasswordModal(false);
    }

    const SignupSchema = Yup.object().shape({
        login: Yup.string().email('Invalid login/email').required('Login is required'),
        password: Yup.string().required('Password is required')
      });


    return (
        <div className="loginPage">
             <div>
            <MyModal visible={registerModal} setVisible={setRegisterModal}>
                <RegistrationForm register={register}/>
            </MyModal>

            <MyModal visible={resetPasswordModal} setVisible={setResetPasswordModal}>
              <PasswordResetForm reset={resetPassword}/>
            </MyModal>
            </div>
        <Formik 
        initialValues={{
            login:'',
            password:''
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
            try {
                await AuthService.login(values.login, values.password);
                setIsAuth(true);
            } catch (error) {
                Notiflix.Notify.failure('The email address or password is incorrect, or the user does not exist. Please try again.');
            }
        }}>
        {({errors, touched}) =>
        <Form className="newLoginForm">
            <div>
                {errors.login && touched.login ? (
                <label className='errorLabel'>{errors.login}</label>
                ) : (<label>Login</label>)}
                <Field
                    name = 'login'
                    type = 'login'
                    className={classNames('formInput', {['formInputError']: errors.login && touched.login})} 
                />
            </div>
            
            <div>
                {errors.password && touched.password ? (
                <label className='errorLabel'>{errors.password}</label>
                ) : (<label>Password</label>)}
                <Field
                    name = 'password'
                    type = 'password'
                    className={classNames('formInput', {['formInputError']: errors.password && touched.password})} 
                    />
            </div>

            <div style={{marginTop: 15}} className="loginBtns">
                    <div>
                        <ConfirmButton style={{width: '85px'}} type="submit">Login</ConfirmButton>
                         <ConfirmButton style={{width: '85px', marginLeft: 4}} type="button" onClick={() => setRegisterModal(true)}>Sing
                          Up</ConfirmButton>
                        {/* <Link to="/passwordreset"> */}
                    </div>
                    <div>
                       <MyButton type="button" style={{width: '150px'}} onClick={() => setResetPasswordModal(true)}>Forgot
                           Password?</MyButton>
                       {/* </Link> */}
                    </div>
                </div>

        </Form>
        }

        </Formik>
        </div>
    )
}
export default Login