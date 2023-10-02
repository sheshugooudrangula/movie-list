import './Navbar.css';
import React, { useState } from 'react';
import CompanyInfo from './CompanyInfo';


 function Navbar() {
    const [showCompanyInfo, setShowCompanyInfo] = useState(false);

  const toggleCompanyInfo = () => {
    setShowCompanyInfo(!showCompanyInfo);
  };
  return (
    <div>
        <div>
        <nav className="navbar">
      <ul>
        <li>
          <a href="/Signup">SignUp</a>
        </li>
        <li>
          <a href="/Login">Login</a>
        </li>
        <li>
        <button onClick={toggleCompanyInfo}>Company Info</button>        </li>
      </ul>
      {showCompanyInfo && <CompanyInfo />}
    </nav>
      </div>
       
    </div>
  )
}
export default Navbar;
