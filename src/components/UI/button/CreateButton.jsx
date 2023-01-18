import React, {useState} from "react";
import classes from './CreateButton.module.css'

const CreateButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.createBtn}>
            {children}
        </button>
    )
}
export default CreateButton;