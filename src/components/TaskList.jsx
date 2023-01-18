import React from "react";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import TaskItem from "./TaskItem";
import '../styles/App.css';

const TaskList = ({tasks, remove, update}) => {

    // if (!tasks.length) {
    //     return (
    //         <h1 style={{textAlign: 'center'}}> No Tasks </h1>
    //     )
    // }
    return (
        
            <div className="taskList">   
                    {/* <TransitionGroup> */}

                        {tasks.map((task) =>
                            // <CSSTransition
                               
                            //     timeout={500}
                            //     classNames="task"
                            // >
                                
                                <TaskItem  key={task.id} remove={remove} task={task} update={update}/>
                          
                            //  </CSSTransition>
                        )}
                    {/* </TransitionGroup> */}
                
            </div>

    );
}
export default TaskList;