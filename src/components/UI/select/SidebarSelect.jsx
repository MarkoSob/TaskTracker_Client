import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from './SidebarSelect.module.css'

const SidebarSelect = ({options, defaultValue, value, onChange}) => {
    return(
        <select 
            className={classes.sidebarSelect} 
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option disabled = {true} value=''>{defaultValue}</option>
            {options.map(option =>
            <option key={option.value} value={option.value}>{option.name}</option>
        )}
        </select>
    )
}

export default SidebarSelect;