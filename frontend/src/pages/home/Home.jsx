import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './style.css';
import Task from "../../components/task/task";
import List from "../../components/list/list";

const Home = () => {
  const [list, setList] = useState([]);

  const title = useRef();
  const navigate = useNavigate();

  // Functions

  const createList = async (title) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:8000/create_list`, { title, token });
      console.log('res',response.data)
      setList([...list, response.data.data]);
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  const handleListCreation = async (e) => {
    e.preventDefault();
    let tt = title.current.value;
    createList(tt);
    title.current.value = '';
  };

  const fetchLists = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:8000/list/all`, { token });
      setList(response.data.data);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  // Handle drag
  const handleDrag = async (result) => {
    const { destination, source } = result;

    // If there's no valid destination, return
    if (!destination) return;

    // If the draggable item was dropped back to its original position, return
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Get the source and destination list IDs
    const sourceListId = source.droppableId;
    const destinationListId = destination.droppableId;

    // Find the source and destination lists in the list state
    const sourceListIndex = list.findIndex((list) => list._id === sourceListId);
    const destinationListIndex = list.findIndex((list) => list._id === destinationListId);

    // Get the source and destination lists
    const sourceList = list[sourceListIndex];
    const destinationList = list[destinationListIndex];

    const sourceOrder = sourceList.taskOrder;
    const destinationOrder = destinationList.taskOrder;

    // Move the task from the source list to the destination list
    const taskToMove = sourceList.taskOrder.splice(source.index, 1)[0];
    destinationList.taskOrder.splice(destination.index, 0, taskToMove);

    // Update the list state with the modified lists
    setList([...list]);

    // Make an API call to update the task order in the backend
    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:8000/list/updateTaskOrder`, {
        token,
        sourceListId,
        destinationListId,
        sourceOrder,
        destinationOrder
      });
    } catch (error) {
      console.error("Error updating task order:", error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <>
      <DragDropContext onDragEnd={handleDrag}>
        <div className="create-list-form-container">
          <form className="create-list-form" onSubmit={handleListCreation}>
            <input type="text" placeholder="Create list" ref={title} />
            <button className="createList-btn" type="submit">Create List</button>
          </form>
        </div>
        <div className="List-main-container">
          {list.map((item, index) => (
            <List key={item._id} fullList={list} list={item} setList={setList} index={index} />
          ))}
        </div>
      </DragDropContext>
    </>
);
};

export default Home;