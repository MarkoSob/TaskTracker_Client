import React, {useState} from "react";
import classes from './PageMenu.module.css'
import classNames from 'classnames';
import {useContext} from 'react';
import {Link} from "react-router-dom";
import AuthService from '../../../API/AuthService';
import {AuthContext} from '../../../context/context';
import NavbarButton from '../button/NavbarButton';
import "bootstrap/dist/css/bootstrap.min.css";
import CreateButton from "../button/CreateButton";

const PageMenu = (props) => {

    const [btnClicked, setBtnClicked] = useState(false);
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const setMenuActive = () => {
      setBtnClicked(!btnClicked);
    }

    
    const logout = () => {
        AuthService.logout();
        setIsAuth(false);
        setBtnClicked(!btnClicked);
    }

    return (
        
        <div className={classes.menublock}>
          <nav className={classNames(classes.menunav, {[classes.menunav_active]: btnClicked})}>
            <div className={classes.navBtns}>
              <div>
              <Link to="/tasks">
                    <NavbarButton onClick={setMenuActive} style={{width:100, height: 45}}>
                        Tasks
                    </NavbarButton>
                </Link>
                </div>
                <div>
                <Link to="/userpage">
                    <NavbarButton onClick={setMenuActive} style={{width:100, height: 45}}>
                        Profile
                    </NavbarButton>
                </Link>
                </div>
                <div>
                <NavbarButton onClick={logout} style={{width:100, height: 45}}>
                    Logout
                </NavbarButton>
                </div>
                </div>
                <div className={classes.createBtn}>
                <CreateButton style={{width:'100%'}} onClick={setMenuActive}>
                    Create Task
                </CreateButton>
               </div>
          </nav>
          <a href="#" onClick={setMenuActive} className={classNames(classes.menubtn, {[classes.menubtn_active]: btnClicked})} >
            <span></span>
          </a>
          
        </div>
     
    )
}
export default PageMenu;