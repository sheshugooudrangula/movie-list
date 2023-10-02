import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import { Routes , Route} from 'react-router-dom';
import Navbar from './Navbar';

function App() {
  return (
    <div >


<Navbar/>
      <Routes>
     
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    
     
    </div>
  );
}

export default App;
