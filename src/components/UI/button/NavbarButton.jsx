import React, {useState} from "react";
import classes from './NavbarButton.module.css'

const NavbarButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.navbarBtn}>
            {children}
        </button>
    )
}
export default NavbarButton;