import React, {useState} from "react";
import MyInput from "./UI/input/MyInput";
import TaskService from "../API/TaskService";
import '../styles/App.css';
import MySelect from "./UI/select/MySelect";
import UpdateFormCalendar from "./UI/mycalendar/updateformcalendar";
import MyTextarea from "./UI/input/MyTextarea";
import ConfirmButton from "./UI/button/ConfirmButton";
import Notiflix from "notiflix";

const TaskUpdateForm = ({update, task}) => {
    const [taskForUpdate, setTaskForUpdate] = useState({
        id: task.id,
        title: task.title,
        startDate: task.startDate,
        description: task.description,
        endDate: task.endDate,
        priority: task.priority,
        status: task.status,
        userEmail: localStorage.getItem("email")
    });

    const updateTask = async (e) => {
        e.preventDefault();
        await TaskService.update(
            taskForUpdate.id,
            taskForUpdate.title,
            taskForUpdate.startDate,
            taskForUpdate.endDate,
            taskForUpdate.description,
            taskForUpdate.status,
            taskForUpdate.priority,
            taskForUpdate.userEmail);
        update();
        Notiflix.Notify.success('Task ' + taskForUpdate.title+ ' was updated');
        setTaskForUpdate({
            id: task.id,
            title: taskForUpdate.title,
            startDate: taskForUpdate.startDate,
            endDate: taskForUpdate.endDate,
            description: taskForUpdate.description,
            priority: taskForUpdate.priority,
            status: taskForUpdate.status,
            userEmail: localStorage.getItem("email")
        });

    }

    const onChangeStartdate = (date) => {
        console.log(date);
        setTaskForUpdate({
            ...taskForUpdate,
            startDate: date
        });
    }

    const onChangeEnddate = (date) => {
        console.log(date);
        setTaskForUpdate({
            ...taskForUpdate,
            endDate: date
        });
    }

    return (
        <form className="newTaskForm">
            <h3>Update Task</h3>
            <div style={{marginLeft:11, marginRight:11}}>
                <MyInput
                    value={taskForUpdate.title}
                    onChange={e => setTaskForUpdate({...taskForUpdate, title: e.target.value})}
                    type="text"/>
            </div>
            <div style={{marginLeft:11, marginRight:11}}>
                <MyTextarea
                    value={taskForUpdate.description}
                    rows="6"
                    cols="50"
                    type="text"
                    placeholder="Description"
                    onChange={e => setTaskForUpdate({...taskForUpdate, description: e.target.value})}/>
                    
            </div>
            <div className="fieldsPickArea">
                <div className="fieldPicker">
                <label> Start date:</label>
                <UpdateFormCalendar
                    value={taskForUpdate.startDate}
                    name="endDate"
                    //value={this.state.startdate}
                    onChange={onChangeStartdate}
                />
                </div>
                <div className="fieldPicker">
                <label> End date:</label>
                <UpdateFormCalendar
                    value={taskForUpdate.endDate}
                    name="endDate"
                    //value={this.state.startdate}
                    onChange={onChangeEnddate}
                />
                 </div>
            </div>
                <div className="fieldsPickArea">
                <div className="fieldPicker">
                <label> Task status:</label>
                    <MySelect
                        value={taskForUpdate.status}
                        onChange={value => setTaskForUpdate({...taskForUpdate, status: value})}
                        defaultValue={taskForUpdate.status}
                        options={[
                            {value: 'Canceled', name: 'Canceled'},
                            {value: 'New', name: 'New'},
                            {value: 'InProgress', name: 'In Progress'},
                            {value: 'Completed', name: 'Completed'},
                            {value: 'Overdue', name: 'Overdue'},
                            {value: 'None', name: 'None'}
                        ]}
                />
                </div>
                    <div className="fieldPicker">
                    <label> Task priority:</label>
                    <MySelect
                        value={taskForUpdate.priority}
                        onChange={value => setTaskForUpdate({...taskForUpdate, priority: value})}
                        defaultValue={taskForUpdate.priority}
                        options={[
                            {value: 'Low', name: 'Low'},
                            {value: 'Medium', name: 'Medium'},
                            {value: 'High', name: 'High'},
                            {value: 'Critical', name: 'Critical'},
                            {value: 'None', name: 'None'}
                        ]}
                />
                </div>
            </div>
            <div>
            <ConfirmButton style={{width: '100%', marginTop: 25, marginBottom: 25}} onClick={updateTask}> Update Task </ConfirmButton>
            </div>
        </form>
    );
}

export default TaskUpdateForm;