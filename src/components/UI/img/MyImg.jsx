import React, {useState} from "react";
import classes from './MyImg.module.css'

const MyImg = ({...props}) => {
    return (
        <img {...props} className={classes.myImg}/>
    )
}
export default MyImg;