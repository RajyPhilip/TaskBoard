import React, { useState,useRef,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import'./style.css'
import Task from "../../components/task/task";
import List from "../../components/list/list";

const Home = () => {
  const [list, setList] = useState('');

  const title = useRef();


  const navigate = useNavigate();

  //functions

  const createList = async (title) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:8000/create_list`, { title,token});
      setList([...list, response.data.data]);
      
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  const handleListCreation = async (e) => {
    e.preventDefault();
    let tt = title.current.value
    createList(tt);
    title.current.value = '';
  };

  const fetchLists = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:8000/list/all`,{token});
      setList(response.data.data);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };




  useEffect(() => {
    fetchLists();
  }, []);
  return (
    <>
      <div className="create-list-form-container">
        <form className="create-list-form" onSubmit={handleListCreation}>
          <input
            type="text"
            placeholder="Create list"
            ref={title}
            
          />
          <button className="createList-btn" type="submit">Create List</button>
        </form>
      </div>
      <div className="List-main-container">
        {list &&
          list.map((item)=>{
            return(
              <List key={item._id} item={item} />
            )
          })
        }
      </div>
    </>
  )
}

export default Home;
