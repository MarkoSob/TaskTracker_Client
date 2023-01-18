import AuthService from '../API/AuthService'
import React, {useState} from "react";
import '../styles/App.css';
import ConfirmButton from './UI/button/ConfirmButton';
import Notiflix from 'notiflix';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"/>

const RegistrationForm = ({register}) => {

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

    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
          .min(2, 'First Name must contain at least 2 characters')
          .max(50, 'Too Long!')
          .required('First Name is required'),
        lastName: Yup.string()
          .min(2, 'Last Name must contain at least 2 characters')
          .max(50, 'Too Long!')
          .required('Last Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special character"
          ).required('Password is required')
      });

    return (
        <Formik 
            initialValues={{
                firstName:'',
                lastName:'',
                email:'',
                password:''
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
                try {
                    await AuthService.register(values.firstName, values.lastName, values.email, values.password);
                    register();
                    Notiflix.Notify.success('Registration was successful, Confirmation email was sent to ' + values.email);
                    setNewUser({firstName: '', lastName: '', email: '', password: ''});
                } catch (error) {
                    Notiflix.Notify.failure('Registration error, please try again');
                }
            }}>
            {({errors, touched}) =>
            <Form className="registrationForm">
                <div>
                    <h2>SIGN UP</h2>
                </div>
                {/* {errors.firstName && touched.firstName &&
                (<label className='errorLabel'>Error</label>) || 
                !errors.firstName &&
                (<label>First Name</label>)
                } */}
                <div>
                    {errors.firstName && touched.firstName ? (
                    <label className='errorLabel'>{errors.firstName}</label>
                    ) : (<label>First Name</label>)}
                    <Field
                        name = 'firstName'
                        type = 'firstName'
                        className={classNames('formInput', {['formInputError']: errors.firstName && touched.firstName})} 
                    />
                </div>
                <div>
                    {errors.lastName && touched.lastName ? (
                    <label className='errorLabel'>{errors.lastName}</label>
                    ) : (<label>Last Name</label>)}
                    <Field
                        name = 'lastName'
                        type = 'lastName'
                        className={classNames('formInput', {['formInputError']: errors.lastName && touched.lastName})} 
                        />
                </div>
                <div>
                    {errors.email && touched.email ? (
                    <label className='errorLabel'>{errors.email}</label>
                    ) : (<label>Email</label>)}
                    <Field
                        name = 'email'
                        type = 'email'
                        className={classNames('formInput', {['formInputError']: errors.email && touched.email})} 
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
                <div>
                <ConfirmButton type='submit' style={{width: '100%', marginTop: 35}}> Register </ConfirmButton>
                {/* {errors.firstName && (Notiflix.Notify.failure(errors.firstName))} */}
                </div>
            </Form>
            }
            
            </Formik>
    )
}

export default RegistrationForm