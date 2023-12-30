import React, { useContext, useState } from 'react'
import Switch from '@mui/material/Switch'
import { Link } from 'react-router-dom'
import blogContext from '../Context/blogContext'

function Navbar(props) {
  const [showMenu, setShowMenu] = useState(false)
  const {isDark, handleOnChange} = props.mode  

  const {test} = useContext(blogContext)
   
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  
  if(showMenu){
    document.body.style.overflow = 'hidden';
  }
  else{
    document.body.style.overflow = 'unset';
  }
  const handleMenu = () => {
    setShowMenu(!showMenu);
  }

  const onClickLoginHandler = () => {
    localStorage.setItem('isAdmin', 'true')
    // window.location.reload(true)
  }

  return (
    <div>
      <div className='nav-bar container-fluid'>
        <div className="container">
            <div className="row">
              <div className="col-ssl-2 col-lg-2 col-md-2 col-sm-4 col-4">
                <p className='logo'><span>Meta</span><b>Blog</b></p>
              </div>
              <div className="col-xxl-6 col-lg-7 col-md-7 col-sm-12 col-12 menu mobileMenu">
                <ul className={`pcMenu ${showMenu ? 'ac' : 'deActive'}`}>
                  <li><Link to='/'>Home</Link></li>
                  <li><Link to='/Blogs'>Blog</Link></li>
                  <li><Link to=''>Single Post</Link></li>
                  <li><Link to=''>Pages</Link></li>
                  <li><Link onClick={() => onClickLoginHandler()}>Login</Link></li>
                </ul>
              </div>
              <div className="col-xxl-3 col-lg-3 col-md-3 col-sm-8 col-12 search">
                <div className='d-flex'>
                  <input type='text' placeholder='Search Blog...'/><i className="fa-solid fa-magnifying-glass"></i>
                  <Switch {...label} checked={isDark} onClick={handleOnChange}/>
                  <div className='toggleBtn d-none d-flex'>
                      <i className={`fa-solid fa-bars-staggered ${showMenu ? 'd-none' : ''}`} onClick={handleMenu}></i>
                      <i className={`fa-solid fa-xmark ${showMenu ? '' : 'd-none'}`} onClick={handleMenu}></i>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
