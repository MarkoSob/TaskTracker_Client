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
import UserCard from "../components/UserCard";

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"/>

const UserPage = () => {
    const serverURL = "http://localhost:8080/";
    const [imagePath, setImagePath] = useState('');
    const [userInfo, setUserInfo] = useState({});
    const [updateModal, setUpdateModal] = useState(false);

    const getUserInfo = async () => {
        const response = await UserService.getUserInfo(localStorage.getItem('email'));
        console.log(response);
        setUserInfo(response.data);
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <div>
        <UserCard/>
        </div>
    )
}
export default UserPage