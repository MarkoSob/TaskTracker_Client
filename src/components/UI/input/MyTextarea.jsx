import React, {useState, useRef, useEffect} from 'react';
import classes from './MyTextarea.module.css'

const MyTextarea = function (props) {
    return (
        <textarea className={classes.myTextarea} {...props}/>
    )
}
export default MyTextarea;