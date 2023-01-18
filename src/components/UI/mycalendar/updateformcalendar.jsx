import React, {useState} from "react";
import DatePicker from "react-datepicker";
import {format} from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import classes from './MyCalendar.module.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
function UpdateFormCalendar({name, onChange, value}) {
    const [startDate, setStartDate] = useState(new Date(value));

    const onChangeDate = (date) => {
        onChange(format(new Date(date), "MM.dd.yyyy HH:mm")
        );
        setStartDate(date);
    }
    return (
        <DatePicker className={classes.myCalendar} name={name} selected={startDate}
                    onChange={(date) => onChangeDate(date)}/>
    );
};
export default UpdateFormCalendar;