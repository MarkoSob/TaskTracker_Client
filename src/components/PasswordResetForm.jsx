import {useContext} from 'react'
import AuthService from '../API/AuthService'
import MyInput from './UI/input/MyInput'
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import ConfirmButton from './UI/button/ConfirmButton'
import Notiflix from 'notiflix';
import '../styles/App.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';


<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"/>

const PasswordResetForm = ({reset}) => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time)
        )
    }

    const resetPassword = async (event) => {
        event.preventDefault();
        await AuthService.resetPassword(email);
        reset();
        Notiflix.Notify.success('New temporary password was sent to ' + email);
        setEmail('');
        await sleep(2000);
    }

    const SignupSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required')
      });

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    return (
        // <form className="newLoginForm">
        //     <div>
        //         <div className='formLabels'>
        //             <strong >Please enter your email to get new temporary password:</strong>
        //         </div>
        //         <div>
        //             <MyInput type="text" value={email} placeholder="Email" onChange={onChangeEmail}/>
        //         </div>
        //         <div>
        //             <ConfirmButton style={{width: '100%', marginTop: 35}} onClick={resetPassword}> Reset
        //                 Password </ConfirmButton>
        //         </div>
        //     </div>
        // </form>

        <Formik 
        initialValues={{
            email:'',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
            try{
            await AuthService.resetPassword(values.email);
            reset();
            Notiflix.Notify.success('New temporary password was sent to ' + values.email);
            setEmail('');
            } 
            catch (error) {
            Notiflix.Notify.failure('User with email ' + values.email + ' does not exist');
            }
        }}>

        {({errors, touched}) =>
        <Form className="newLoginForm">
           
            <div className='formLabels'>
                  <strong >Please enter your email to get new temporary password:</strong>
            </div>
              {errors.email && touched.email ? (
                <label className='errorLabel'>{errors.email}</label>
                ) : (<label>Email</label>)}
                <Field
                    name = 'email'
                    type = 'email'
                    className={classNames('formInput', {['formInputError']: errors.email && touched.email})} 
                />
            
            <div>
                <ConfirmButton style={{width: '100%', marginTop: 35}} type='submit'> Reset
                       Password </ConfirmButton>
              </div>
           
        </Form>
        }

        </Formik>
    )
}

export default PasswordResetForm