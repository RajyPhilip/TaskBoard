import React from 'react' ;
import './style.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to the Task Board App</h1>
      <p>Start organizing your tasks efficiently!</p>
      <div className="features">
        <div className="feature">
          <h2>Create Multiple Lists</h2>
          <p>Create multiple lists to categorize your tasks and stay organized.</p>
        </div>
        <div className="feature">
          <h2>Drag and Drop Tasks</h2>
          <p>Easily move tasks from one list to another using intuitive drag and drop functionality.</p>
        </div>
        <div className="feature">
          <h2>Mark Tasks as Completed</h2>
          <p>Mark tasks as completed and keep track of your progress.</p>
        </div>
      </div>
    <button>Login To Get Started</button>
  </div>
  )
}

export default LandingPage