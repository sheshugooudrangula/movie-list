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
      newErrors.name = alert("Name is required");
    }

    if (!formData.password) {
      newErrors.password = alert("Enter password ");
    } else if (formData.password.length < 6) {
      newErrors.password = alert("Password must have at least 6 characters ");
    }

    if (!formData.email.trim()) {
      newErrors.email = alert("Enter email ");
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = alert('Invalid email address');
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = alert('Phone number is required');
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber =  alert('Invalid phone number format');
    }

    if (!formData.profession) {
      newErrors.profession = alert('Profession is required');
    }

    if (Object.keys(newErrors).length === 0) {
        localStorage.setItem('userData', JSON.stringify(formData));
        navigate('/Login');
      } else {
        setErrors(newErrors);
      }
    };
   
    
    
  

  return (
    <div className='outer-box'>
    <div className='inner-box'>
      <h2>User Signup</h2>
      <form onSubmit={handleSubmit} className='signup-body'>
      <label >Name:
      <input
            type="text"
             placeholder='enter name'
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
           
          />            </label>
           
            
            <label >Password:
            <input
            type="password"
            placeholder='enter password'
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
         
          />            </label>
           

            <label >Email:
            <input
            type="email"
            placeholder='enter email'
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}

            
          />            </label>
            
            <label>Phone Number:   
            <input
            type="tel"
            placeholder='enter number'
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}

          />            </label>
            
            <label className='for-p'>Profession:</label>
          <select
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
          >
            <option value="">Select Profession</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="engineer">Engineer</option>
            
          </select>
          <br></br>
            <br></br>
            <input type='submit' id='submit' value="Singup"/>
        {errors.profession && <span className="error">{errors.profession}</span>}
        <div className='signup-footer'>
        <h3 onClick={() => navigate('/login')}>Already have an account? <span className='of'>Log In</span> </h3>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Signup;
