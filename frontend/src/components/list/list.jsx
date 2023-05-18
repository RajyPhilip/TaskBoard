import React, { useRef } from "react";
import { Droppable } from 'react-beautiful-dnd';
import axios from "axios";
import Task from '../task/task';import './style.css'

const List = ({ list, fullList, setList }) => {
    const taskTitle = useRef();
    
// functions
    const handleAddTask = async (e) => {
        e.preventDefault();
        const title = taskTitle.current.value;
        const listId = list._id;
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(`http://localhost:8000/create_task/${listId}`, {
                token,
                name: title,
            });
            const newTask = response.data.data;
            const updatedList = [...fullList];
            const listIndex = updatedList.findIndex((li) => li._id === list._id);
            updatedList[listIndex].taskOrder.push(newTask);
            setList(updatedList);
        // Clear the input field
            taskTitle.current.value = "";
        } catch (error) {
            console.error("Error creating task:", error);
        }
};
const handleDeleteTasks = async (e) => {
    e.preventDefault();
    const listId = list._id;
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(`http://localhost:8000/deleteCompletedTasks`, {
            token,
            listId
        });
        const newCurrentList = response.data.data;
        
    } catch (error) {
        console.error("Error deleting tasks:", error);
    }
  };


    return (
        <div className="List-container">
            <div>
                <h3>{list.name}</h3>
            </div>
            <Droppable droppableId={list._id}>
                {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="task-container">
                    {list.taskOrder.map((item, index) => (
                    <Task fullList={fullList} setList={setList} key={item._id} index={index} tasks={item} />
                    ))}
                    {provided.placeholder}
                </div>
                )}
            </Droppable>
            <div className="add-task-container">
                <form onSubmit={handleAddTask} className="add-task-form">
                <input
                    type="text"
                    placeholder="Add Task"
                    required
                    ref={taskTitle}
                />
                <button className="add-task-btn" type="submit">Add Task to List</button>
                </form>
            </div>
            <div className="add-task-container">
                <form onSubmit={handleDeleteTasks} className="add-task-form">
                <button className="delete-task-btn" type="submit">Delete Completed Tasks</button>
                </form>
            </div>
        </div>
    );
};

export default List;
