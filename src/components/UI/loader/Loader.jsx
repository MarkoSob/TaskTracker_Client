import React, {useState} from "react";
import cl from './Loader.module.css';
import {MutatingDots} from 'react-loader-spinner'

const Loader = () => {

    return (
        <MutatingDots
            height="100"
            width="100"
            color="#58a396"
            secondaryColor='#58a396'
            radius='12.5'
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    )
}
export default Loader;