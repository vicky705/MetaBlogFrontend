import React, { useContext, useEffect, useState } from 'react'
import Leftnavbar from './Leftnavbar'
import Topnavbar from './Topnavbar'
import Mainbody from './Mainbody'
import AdminState from '../Context/AdminState'
import Blogs from './Blogs'
import Profile from './Profile'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Addablog from './Addablog'
import Updateblog from './Updateblog'
import Login from './Login'
import Signup from './Signup'

function Admin() {
    const [leftnav, setLeftNav] = useState("true")
    const navigate = useNavigate()
    const handleLeftNav = () => {
        setLeftNav(!leftnav)
    }
    useEffect(() => {
      if(!localStorage.getItem('auth-token')){
        navigate('/admin/login')
      }
      else{
        navigate('/admin')
      }
    },[])

  return (
    <div>
      <AdminState>
        {localStorage.getItem('auth-token') ? 
        <div className='d-flex admin'>
            <Leftnavbar data={leftnav}/>
            <div className='top-nav'>
              <Topnavbar data={handleLeftNav}/>
                <Routes>
                  <Route path='/admin' element={<Mainbody/>}/>
                  <Route path='/admin/blogs' element={<Blogs />}/>
                  <Route path='/admin/profile' element={<Profile/>}/>
                  <Route path='/admin/write-a-blog' element={<Addablog/>}/>
                  <Route path='/admin/blogs/:id' element={<Updateblog />}/>
                </Routes>
            </div>
        </div> : 
          <Routes>
            <Route path='/admin/login' element={<Login />}/>
            <Route path='/admin/signup' element={<Signup />}/>
          </Routes>
        }
      </AdminState>
    </div>
  )
}

export default Admin
