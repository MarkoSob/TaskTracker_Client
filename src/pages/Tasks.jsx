import React, {useEffect, useState, useRef} from "react";
import NewTaskForm from "../components/NewTaskForm";
import TaskList from "../components/TaskList";
import TaskFilter from "../components/TaskFilter";
import MyModal from "../components/UI/mymodal/MyModal";
import '../styles/App.css';
import {useTasks} from "../hooks/useTasks";
import Loader from "../components/UI/loader/Loader";
import {useFetching} from "../hooks/useFetching";
import {getPageCount, getPagesArray} from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";
import TaskService from "../API/TaskService";
import ConfirmButton from "../components/UI/button/ConfirmButton";
import MyHr from "../components/UI/hr/MyHr";
import CreateButton from "../components/UI/button/CreateButton";
import SidebarSelect from "../components/UI/select/SidebarSelect";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [createModal, setCreateModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [listTitle, setListTitle] = useState('');
    const sortedAndSearchedTasks = useTasks(tasks, filter.sort, filter.query);
    const lastElement = useRef();
    console.log(lastElement);

    const [fetchTasks, isTaskLoading, taskError] = useFetching(async () => {
        const response = await TaskService.getAllUserTasks(localStorage.getItem('email'));
        setTasks([...response.data]);
        console.log(response.headers);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    });

    // useObserver(lastElement, page < totalPages, isTaskLoading, () => {
    //     setPage(page + 1);
    // })

    useEffect(() => {
        fetchTasks(limit, page);
    }, [page, limit]);

    useEffect(() => {
        checkTitle();
    }, [tasks]);

    const createTask = async () => {
        const response = await TaskService.getAllUserTasks(localStorage.getItem('email'));
        setTasks([...response.data]);
        setCreateModal(false);
    }

    const updateTask = async () => {
        const response = await TaskService.getAllUserTasks(localStorage.getItem('email'));
        setTasks([...response.data]);
    }

    const deleteTask = async (task) => {
        TaskService.deleteById(task.id)
        setTasks(tasks.filter(t => t.id !== task.id))
    }
    
    const checkTitle = () => {
        if(tasks.length == 0){
            setListTitle('No Tasks');
        }
        else{
            setListTitle('List of tasks')  
        }
    }

    const changePage = (page) => {
        setPage(page);
    }
    return (
        <div className="mainArea">
            <aside className="sidebar"> 
            <div>
                <CreateButton onClick={() => setCreateModal(true)}>
                    Create Task
                </CreateButton>
               
            </div>
            {/* <div>
           
            {taskError &&
                <h1>Error</h1>}

            </div> */}
            <div className="searchFilters">
            <TaskFilter
                filter={filter}
                setFilter={setFilter}
            />
            {/* <SidebarSelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue='Number of elements'
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Show all'}
                ]}
                
            /> */}
            </div>
           
            </aside>
            <main className="tasksArea">
           
            {/* <div>
            <h1>{listTitle}</h1>
            </div> */}
            <div>
           
            <TaskList remove={deleteTask} update={updateTask} tasks={sortedAndSearchedTasks}/>
            {/* <div ref={lastElement} style={{height: 5, background: 'white'}}></div> */}
            {isTaskLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 150}}>
                    <Loader/>
                </div>
            }
            {/* <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}/> */}
                 <MyModal visible={createModal} setVisible={setCreateModal}>
                    <NewTaskForm create={createTask}/>
                </MyModal>
            </div>
            </main>
        </div>
    );
}
export default Tasks;
