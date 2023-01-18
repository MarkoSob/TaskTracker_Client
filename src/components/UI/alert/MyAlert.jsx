import React, {useContext, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from './MyAlert.module.css';
import {ConfirmationAlertContext} from "../../../context/context";

const MyAlert = ({text}) => {
    const {isAlertVisible, setIsAlertVisible} = useContext(ConfirmationAlertContext);
    const rootClasses = [classes.MyAlert];
    //const [isAlertVisible, setIsAlertVisible] = useState(false);

    if (isAlertVisible) {
        rootClasses.push(classes.active);
    }

    return (
        <ConfirmationAlertContext.Provider value={{
            isAlertVisible,
            setIsAlertVisible
        }}>
            <div>
                {isAlertVisible && <div className="alert alert-success mt-2" role="alert">
                    {text}
                </div>}
            </div>
        </ConfirmationAlertContext.Provider>
    )
}

export default MyAlert;