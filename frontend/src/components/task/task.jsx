import React from "react";
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ tasks, index }) => {
    
  const handleDeleteTask = (e) => {
    e.preventDefault();
    console.log("Delete task", tasks);
  };

  return (
    <Draggable draggableId={tasks._id} index={index}>
      {(provided) => (
        <div
          className='task'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="checkUncheck-task">
            <input onClick={handleDeleteTask} type="checkbox" />
            <p>{tasks.title}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
