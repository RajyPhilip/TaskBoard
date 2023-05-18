import React, { useState,useRef,useEffect } from "react";
import axios from "axios";

import Task from '../task/task';


const List = ({item}) => {

    const [tasks, setTasks] = useState([]);
    const taskTitle = useRef();

    //function
    const createTask = async(name,listID)=>{
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:8000/create_task/${listID}`, { name,token});
            console.log('resss',response)

            setTasks([...tasks,response.data.data]);
        } catch (error) {
            console.error("Error creating list:", error);
        }
    }

    const handleAddTask = (e,params)=>{
        e.preventDefault();
        let taskName = taskTitle.current.value;
        console.log(params)
        createTask(taskName,params);
        taskTitle.current.value = '';
    }
    

return (
    <div  className="List-container">
        <div>
            <h3>{item.name}</h3>
        </div>
        <div className="task-container">
            <Task key={item._id} list={item} tasks={tasks} setTasks={setTasks}  />
        </div>
        <div className="add-task-container" >
            <form onSubmit={(e)=>{handleAddTask(e,item._id)}} className="add-task-form" >
                <input
                type="text"
                placeholder="Add Task"
                ref={taskTitle}
                />
                <button className="add-task-btn" type="submit">Add Task to list </button>
            </form>
        </div>
        </div>
)
}

export default List ;