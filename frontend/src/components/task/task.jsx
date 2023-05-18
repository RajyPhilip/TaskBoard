import React, { useState,useRef,useEffect } from "react";
import axios from "axios";

const Task = ({list,tasks,setTasks}) => {
   
    
    // functions
    const fetchTasks = async () => {
        try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`http://localhost:8000/task/all/${list._id}`, {
            token,
        });
        setTasks(response.data.tasks);
        } catch (error) {
        console.error("Error fetching lists:", error);
        }
    }; 

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <>
        {
            tasks && tasks.map((item)=>{
                return(
                    <div key={item._id} className="checkUncheck-task">
                        <input type="checkbox"  />
                        <p>{item.title}</p>
                    </div>
                )
            })
        }
        </>
    )
}

export default Task;

<div className="checkUncheck-task">
            <input type="checkbox"  />
            <p>Task 1</p>
        </div>