import { useEffect, useState } from 'react';
import './App.css';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Blogs from './Components/Blogs';
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom'
import Blogviewer from './Components/Blogviewer';
import Admin from './Admin/Admin';


function App() {
  const [isDark, setIsDark] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const handleOnChange = () => {
    setIsDark(!isDark)
  }

  useEffect(() => {
    if(!localStorage.getItem('isAdmin')){
      localStorage.setItem('isAdmin', 'false')
    }
    if(localStorage.getItem('isAdmin') === 'false' && location.pathname === '/admin'){
      navigate('/')
    }
  },[])

  const isAdmin = localStorage.getItem('isAdmin')


  return (
    <div>
      {
      isAdmin === 'true' ? <Admin /> :  
      <div data-theme={`${isDark ? 'dark' : ''}`}>    
        <Navbar mode={{isDark, handleOnChange}}/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Blogs' element={<Blogs/>}/> 
            <Route path='/Blog/:id' element={<Blogviewer/>}/>
          </Routes>
        <Footer/>
      </div>
      }
    </div>
  );
}
export default App;
