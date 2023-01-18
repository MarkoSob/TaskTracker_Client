import React, {useState} from "react";
import classes from './ConfirmButton.module.css'

const ConfirmButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.confirmBtn}>
            {children}
        </button>
    )
}
export default ConfirmButton;