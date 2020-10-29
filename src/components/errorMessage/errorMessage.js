import React from 'react';
import './errorMessage.css';
// import img from './error.jpg';
 
const ErrorMessage = () => {
  return (
    <>
      {/* <img src={img} alt="Error"/> */}
      <span className="error-message">Something goes wrong</span>
    </>
  )
}

export default ErrorMessage;