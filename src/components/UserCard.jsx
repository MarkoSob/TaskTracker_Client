import React, {useState, useEffect} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {redirect} from "react-router-dom";
import MyAlert from '../components/UI/alert/MyAlert'
import Image from 'react-bootstrap/Image'
import ImageService from '../API/ImageService'
import MyButton from "../components/UI/button/MyButton";
import MyImg from "../components/UI/img/MyImg";
import UserService from "../API/UserService";
import '../styles/App.css';
import FlipCard from "../components/UI/flipCard/FlipCard";
import UserUpdateForm from "../components/UserUpdateForm";
import MyModal from "../components/UI/mymodal/MyModal";
import { fabClasses } from "@mui/material";
import ConfirmButton from "../components/UI/button/ConfirmButton";

const UserCard = ()=> {
    const [userInfo, setUserInfo] = useState({});
    const [updateModal, setUpdateModal] = useState(false);

    const getUserInfo = async () => {
        const response = await UserService.getUserInfo(localStorage.getItem('email'));
        console.log(response);
        setUserInfo(response.data);
    }
    

    const updateUser = async () => {
        const response = await UserService.getUserInfo(localStorage.getItem('email'));
        setUserInfo(response.data);
        setUpdateModal(false)
    }

    useEffect(() => {
        getUserInfo();
    }, []);


    return (
        <div className="userPage">
            <div className="userCard">
                <div>
                     <div><b>First name:</b> </div>
                     <div><b>Last name:</b> </div>
                     <div><b>Creation date:</b> </div>
                     <div><b>Email:</b></div>
                </div>
                <div>
                   <div>{userInfo.firstName}</div>
                   <div>{userInfo.lastName}</div>
                   <div>{userInfo.creationDate}</div>
                   <div>{userInfo.email}</div>
                </div>
                <div>
                   <ConfirmButton style= {{width:100}} onClick={() => setUpdateModal(true)}>Edit</ConfirmButton>
                </div>

            </div>
            <MyModal visible={updateModal} setVisible={setUpdateModal}>
                <UserUpdateForm user={userInfo} update={updateUser}/>
            </MyModal>
        </div>
    );
}

export default UserCard;