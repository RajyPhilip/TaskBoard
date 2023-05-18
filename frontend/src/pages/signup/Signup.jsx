import React, { useState } from 'react';
import{useNavigate} from 'react-router-dom';
import axios from 'axios';
import './style.css';

const Signup = () => {
  const [authData, setAuthData] = useState({
    email : null,
    name : null,
    password : null,
  })

  const navigate = useNavigate();

  const handleAuthChange = ({currentTarget : input}) => {
    setAuthData((prev) => ({ ...prev, [input.name] : input.value}));
  }

  // hitting register api
  const handleSignUp = async (e) => {
    e.preventDefault();
    const URL = "/user/create"
    try {
      const res = await axios.post(URL, authData)
      if(res.status === 200) {
        navigate('/login')
      }
    } catch (error) {
      return error
    }
    navigate('/login');
  }


  return (
    <div className="signup-page">
    <div className="signup-content">
      <h1>Create an Account</h1>
      <form onSubmit={handleSignUp} className="signup-form">
        <input onChange={handleAuthChange} name='name' type="text" placeholder="Full Name" required />
        <input onChange={handleAuthChange} name='email' type="email" placeholder="Email" required />
        <input onChange={handleAuthChange} name='password' type="password" placeholder="Password" required />
        <input onChange={handleAuthChange} name='confirmPassword' type="password" required  placeholder="Confirm Password" />
        <button>Sign Up</button>
      </form>
      <p className="login-link">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  </div>
  )
}

export default Signup