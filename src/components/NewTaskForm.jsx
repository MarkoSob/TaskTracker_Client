import React, {useState} from "react";
import MyInput from "./UI/input/MyInput";
import Calendar from "./UI/mycalendar/mycalendar";
import TaskService from "../API/TaskService";
import '../styles/App.css';
import MySelect from "./UI/select/MySelect";
import MyTextarea from "./UI/input/MyTextarea";
import ConfirmButton from "./UI/button/ConfirmButton";
import Notiflix from "notiflix";

const NewTaskForm = ({create}) => {
    const [task, setTask] = useState({
        title: '',
        startDate: '',
        endDate: '',
        description: '',
        priority: '',
        status: '',
        userEmail: localStorage.getItem("email")
    });

    const addNewTask = async (e) => {
        e.preventDefault();
        try{
        await TaskService.create(task.title, task.startDate, task.endDate, task.description, task.status, task.priority, task.userEmail);
        create();
        setTask({
            title: '',
            startDate: '',
            endDate: '',
            description: '',
            priority: '',
            status: '',
            userEmail: localStorage.getItem("email")
        });
              }
        catch(error){
            Notiflix.Notify.failure('Please fill the title');
        }
    }

    const onChangeStartdate = (date) => {
        console.log(date);
        setTask({
            ...task,
            startDate: date
        });
    }

    const onChangeEnddate = (date) => {
        console.log(date);
        setTask({
            ...task,
            endDate: date
        });
    }

    return (
        <form className="newTaskForm">
            <h3>Create Task</h3>
            <div style={{marginLeft:11, marginRight:11}}>
                <MyInput
                    value={task.title}
                    onChange={e => setTask({...task, title: e.target.value})}
                    type="text"
                    placeholder="Task title"/>
            </div>

            <div style={{marginLeft:11, marginRight:11}}>
                <MyTextarea
                    rows="6"
                    cols="50"
                    value={task.description}
                    onChange={e => setTask({...task, description: e.target.value})}
                    //  type="text"
                    placeholder="Task description"/>
            </div>
            <div className="fieldsPickArea">
            <div className="fieldPicker">
                <label> Start date:</label>
                <Calendar
                    name="endDate"
                    //value={this.state.startdate}
                    onChange={onChangeStartdate}
                />
                </div>
                <div className="fieldPicker">
                <label> End date:</label>
                <Calendar
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
                    value={task.status}
                    onChange={value => setTask({...task, status: value})}
                    defaultValue='None'
                    options={[
                        {value: 'None', name: 'None'},
                        {value: 'Canceled', name: 'Canceled'},
                        {value: 'New', name: 'New'},
                        {value: 'InProgress', name: 'In Progress'},
                        {value: 'Completed', name: 'Completed'},
                        {value: 'Overdue', name: 'Overdue'}
                    ]}
                />
                </div>
                <div className="fieldPicker">
                <label> Task priority:</label>
                <MySelect
                    value={task.priority}
                    onChange={value => setTask({...task, priority: value})}
                    defaultValue='None'
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
                <ConfirmButton style={{width: '100%', marginTop: 25, marginBottom:25}} onClick={addNewTask}> Add Task </ConfirmButton>
            </div>
        </form>
    );
}

export default NewTaskForm;