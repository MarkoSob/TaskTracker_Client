import React from 'react'
import {useContext} from 'react';
import {Link} from "react-router-dom";
import AuthService from '../../../API/AuthService';
import {AuthContext} from '../../../context/context';
import NavbarButton from '../button/NavbarButton';
import "bootstrap/dist/css/bootstrap.min.css";
import classes from './Navbar.module.css';
import { Menu } from '@mui/material';
import PageMenu from '../menu/PageMenu';

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const logout = () => {
        AuthService.logout();
        setIsAuth(false);
    }

    const rootClasses = [classes.userBtns];
    if (isAuth) {
        rootClasses.push(classes.active);
    }

    return (
        <div>
        <nav className='px-3 d-flex justify-content-between navbar navbar-expand navbar-dark bg-dark'>
            <div className='d-flex justify-content-between align-items-end'>
                <img style={{width: '35px', height: '35px'}} src="/tasklogo.png" alt="no"/>
                <h5 style={{marginLeft: 15, color: '#87f5e3'}}>Tasker</h5>
            </div>
           
                
            
            <div className={rootClasses.join(' ')}>
                <div className={classes.menuBtn}>
                <PageMenu/>
                </div>
                <div className={classes.navBtns}>

                
                <Link to="/tasks">
                    <NavbarButton>
                        Tasks
                    </NavbarButton>
                </Link>
                <Link to="/userpage">
                    <NavbarButton>
                        Profile
                    </NavbarButton>
                </Link>
                <NavbarButton onClick={logout}>
                    Logout
                </NavbarButton>
                </div>
            </div>
        </nav>
        </div>
    )
}
export default Navbar