import React, { useState } from 'react';
import{useNavigate} from 'react-router-dom';
import axios from 'axios';
import './style.css';

const Login = ({setUser}) => {

  const [authData, setAuthData] = useState({
    email : '',
    password : '',
  })

  const navigate = useNavigate() ;

  const handleAuthChange = ({currentTarget : input}) => {
    setAuthData({
      ...authData,
      [input.name] : input.value
    })
  }

  // hitting register api
  const handleSignIn = async (e) => {
    e.preventDefault();
    const URL = "/user/login";
    try {
      const res = await axios.post(URL, authData);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.details) ;
        navigate("/home");
        return;
    } catch (error) {
      return error;
    }
  };
  return (
    <div className="login-page">
      <div className="login-content">
        <h1>Welcome Back!</h1>
        <form onSubmit={handleSignIn} className="login-form">
          <input onChange={handleAuthChange} name='email'  type="text" placeholder="Username" required />
          <input onChange={handleAuthChange}  name='password' type="password" placeholder="Password" required />
          <button>Login</button>
        </form>
        <div className="additional-links">
          <p className="signup-link">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login