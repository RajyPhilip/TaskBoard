import React, { useState , useEffect} from 'react';
import{Routes,Route} from 'react-router-dom' ;
import './App.css';
import Navbar from './components/navbar/Navbar';
import { Home, LandingPage, Login, Signup } from './pages';



function App() {

  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });
useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
  return (
    <>
    <Navbar user={user} setUser={setUser}/>
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route  path='/home' element={<Home />} />
        <Route  path='/login' element={<Login setUser={setUser} />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
