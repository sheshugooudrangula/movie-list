import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Style.css";

function Login() {
  const [loginData, setLoginData] = useState({
    name: '',
    password: '',
  });

  const [errors, setErrors] = useState({}); // State for storing validation errors

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const newErrors = {};

    if (!loginData.name.trim()) {
      newErrors.name =  alert("Enter the name which you are entered in signup page");
    }

    if (!loginData.password) {
      newErrors.password = alert("Enter the password");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }

    if (
      userData &&
      userData.name === loginData.name &&
      userData.password === loginData.password
    ) {
      navigate('/Dashboard');
    } else {
      alert('Invalid Credentials');
    }
  };
  return (
    <div className='outer-box'>
    <div className='inner-box'>
      <h2>User Login</h2>
      <form onSubmit={handleLogin} className='signup-body'>
      <div>
          <label>Name:   </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder='enter name'
            value={loginData.name}
            onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label >Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder='enter password '
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required
          />
        </div>
        <input type='submit' id='submit' value="Login"/>
        {errors.password && <span className="error">{errors.password}</span>}
<div className='signup-footer'>
        <h3  onClick={() => navigate('/signup')}>Don't have an account? <span className='of'>Sign Up</span></h3>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Login;
