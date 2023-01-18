import React, {useState} from "react";
import classes from './MyDeleteButton.module.css'

const MyDeleteButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.myDeleteBtn}>
            {children}
        </button>
    )
}
export default MyDeleteButton;