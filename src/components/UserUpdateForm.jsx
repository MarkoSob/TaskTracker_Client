import React, {useState} from "react";
import MyInput from "./UI/input/MyInput";
import ConfirmButton from "./UI/button/ConfirmButton";
import UserService from "../API/UserService";

const UserUpdateForm = ({update, user}) => {
    const [userForUpdate, setUserForUpdate] = useState({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
    });

    const updateUserInfo = async (e) => {
        e.preventDefault();
        await UserService.updateUserInfo(
            user.id,
            userForUpdate.firstName,
            userForUpdate.lastName,
            );
        update();
        setUserForUpdate({
            id: user.id,
            firstName: userForUpdate.firstName,
            lastName: userForUpdate.lastName
        });

    }

    return (
        <form className="newUserForm">
            <div>
                <MyInput
                    value={userForUpdate.firstName}
                    onChange={e => setUserForUpdate({...userForUpdate, firstName: e.target.value})}
                    type="text"/>
            </div>
            <div>
                <MyInput
                    value={userForUpdate.lastName}
                    onChange={e => setUserForUpdate({...userForUpdate, lastName: e.target.value})}
                    type="text"/>
            </div>
            <div>
                <ConfirmButton style={{width: '100%', marginTop: 35}} onClick={updateUserInfo}> Update Info </ConfirmButton>
            </div>
        </form>
    );
}

export default UserUpdateForm;