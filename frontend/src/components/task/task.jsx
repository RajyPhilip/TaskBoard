import React , {useEffect, useState} from "react";
import { Draggable } from 'react-beautiful-dnd';
import axios from "axios";


const Task = ({ tasks, index ,fullList,setList}) => {
    const [checked, setChecked] = useState(tasks.completed);

    const handleCheck = async(e) => {
        e.preventDefault();
        const newChecked = !checked;
        setChecked(newChecked)
        try {
            const taskId = tasks._id ;
            const listId = tasks.list
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:8000/updateStatus`, { listId,taskId, token });
            const index = fullList.findIndex((item)=>
                item._id == tasks.list 
            )
            let data = response.data.data ;
            fullList[index].taskOrder = data ;
            console.log('hhhh',fullList)
            setList([...fullList]);
        } catch (error) {
            console.error("Error creating list:", error);
        }
    };
    
    return (
        <Draggable draggableId={tasks._id} index={index}>
            {(provided) => (
                <div className='task' {...provided.draggableProps} {...provided.dragHandleProps}
                ref={provided.innerRef}>
                    <div className="checkUncheck-task">
                        <input checked={checked}  onChange={handleCheck} type="checkbox" />
                        <p>{tasks.title}</p>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Task;
