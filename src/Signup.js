import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Style.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    phoneNumber: '',
    profession: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userData', JSON.stringify(formData));
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format';
    }

    if (!formData.profession) {
      newErrors.profession = 'Profession is required';
    }

    if (Object.keys(newErrors).length === 0) {
        localStorage.setItem('userData', JSON.stringify(formData));
        navigate('/Login');
      } else {
        setErrors(newErrors);
      }
    };
   
    
    
  

  return (
    <div className='card'>
      <h2>User Signup</h2>
      <form onSubmit={handleSubmit}>
      <label className='row'>Name:
      <input
            type="text"
             className='name'
             placeholder='enter name'
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />            </label>
           
            
            <label className='row'>Password:
            <input
            type="password"
            placeholder='enter password'
            className='password'
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />            </label>
           

            <label className='row'>Email:
            <input
            type="email"
            placeholder='enter email'
            className='email'
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />            </label>
            
            <label className='rows'>Phone Number:   
            <input
            type="tel"
            className='phoneNumber'
            placeholder='enter number'
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />            </label>
            <br></br>
            <br></br>

            <label className='rows'>Profession:</label>
          <select
            id="profession"
            name="profession"
            className='profession'
            value={formData.profession}
            onChange={handleChange}
            required
          >
            <option value="">Select Profession</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="engineer">Engineer</option>
            
          </select>
          
            <br></br>
        <button type="submit">Sign Up</button>
        {errors.profession && <span className="error">{errors.profession}</span>}

        <h3 onClick={() => navigate('/login')}>Already have an account? Log In</h3>
      </form>
    </div>
  );
}

export default Signup;
