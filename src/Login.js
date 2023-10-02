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
      newErrors.name = 'Name is required';
    }

    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Prevent login if there are validation errors
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
    <div className='card'>
      <h2>User Login</h2>
      <form onSubmit={handleLogin}>
      <div>
          <label className='row'>Name:   </label>
          <input
            type="text"
            className='name'
            id="name"
            name="name"
            placeholder='enter name'
            value={loginData.name}
            onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className='row'>Password:</label>
          <input
            type="password"
            className='password'
            id="password"
            name="password"
            placeholder='enter password'
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required
          />
        </div>
        <button type="submit">Log In</button>
        {errors.password && <span className="error">{errors.password}</span>}

        <h3 onClick={() => navigate('/signup')}>Don't have an account? Sign Up</h3>
      </form>
    </div>
  );
}

export default Login;
