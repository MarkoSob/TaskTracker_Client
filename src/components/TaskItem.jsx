import React from "react";
import MyButton from "./UI/button/MyButton";
import MyDeleteButton from "./UI/button/MyDeleteButton";
import {useNavigate} from 'react-router-dom';
import {useState} from "react";
import MyModal from "./UI/mymodal/MyModal";
import TaskUpdateForm from "./TaskUpdateForm";
import '../styles/App.css';

const TaskItem = (props)=> {
    const router = useNavigate();
    const [updateModal, setUpdateModal] = useState(false);
    const [descriptionModal, setDescriptionModal] = useState(false);
    const [taskForUpdate, setTaskForUpdate] = useState({
        id: props.task.id,
        title: props.task.title,
        startDate: props.task.startDate,
        endDate: props.task.endDate,
        priority: props.task.priority,
        status: props.task.status,
        userEmail: localStorage.getItem("email")
    });

    const updateTask = () => {
        props.update();
        setUpdateModal(false);
    }

    //   const setupUpdateModal = async() =>{
    //     setUpdateModal(true)
    //     console.log(props.task.id);
    //     let response = await TaskService.getById(props.task.id);
    //     console.log(response.data.id);
    //     console.log(response.data.title);
    //     setTaskForUpdate({
    //         id: response.data.id,
    //         title: response.data.title, 
    //         startDate: response.data.startDate, 
    //         endDate: response.data.endDate, 
    //         priority: response.data.priority, 
    //         status: response.data.status, 
    //         userEmail: localStorage.getItem("email") });
    //     console.log(taskForUpdate);
    //   }
    //   useEffect(() => {
    //     GetTaskById(props.task.id)
    //   }, [updateModal]);

    return (
        <div className="taskItem">
            <div className="task">
                <div>
                    <strong>{props.task.title}</strong>
                    <div>Start date: {props.task.startDate} </div>
                    <div>End date: {props.task.endDate} </div>
                    <div>Priority: {props.task.priority} </div>
                    <div>Status: {props.task.status} </div>
                </div>
                <div className="task_btns">
                     <div>
                        <MyButton onClick={() => setDescriptionModal(true)}>Description</MyButton>
                    </div>
                    <div>
                        <MyButton  style={{marginTop: 7, marginBottom: 7}}
                                onClick={() => setUpdateModal(true)}>Update</MyButton>
                    </div>
                    <div>
                        <MyDeleteButton onClick={() => props.remove(props.task)}>Delete</MyDeleteButton>
                    </div>
                </div>
            </div>
            <MyModal visible={updateModal} setVisible={setUpdateModal}>
                <TaskUpdateForm task={taskForUpdate} update={updateTask}/>
            </MyModal>

            <MyModal visible={descriptionModal} setVisible={setDescriptionModal}>
                <div className="task_btns">
                    <div style={{maxWidth: '450px'}}>
                        {props.task.description}
                    </div>
                    <div>
                        <MyDeleteButton style={{marginTop: 7}} onClick={() => setDescriptionModal(false)}>Close</MyDeleteButton>
                    </div>
                </div>
            </MyModal>
        </div>

    );
}

export default TaskItem;