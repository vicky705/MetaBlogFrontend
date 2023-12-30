import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import blogContext from '../Context/blogContext'
import { ToastContainer, toast } from 'react-toastify'

function Signup() {

  const {newUser, setNewUser, createNewUser, getAllBlogs, setAuthToke} = useContext(blogContext)
  const [rePass, setRePass] = useState({
    rePassword : ""
  })

  const navigate = useNavigate()

  const onChangeHandler = (event) => {
    setNewUser({...newUser, [event.target.name] : event.target.value})
  }
  const onChangePassHandler = (event) => {
    setRePass({...rePass, [event.target.name] : event.target.value})
  }

  const onClickSignupHandler = async() => {
    if(newUser.username.trim().length <= 0) return toast.warning('Invalid Username.')
    if(newUser.username.trim().split(' ').length > 1) return toast.warning("Username can't container white space")
    if(newUser.email.trim().length <= 0) return toast.warning('Invalid Email.')
    if(newUser.password.trim().length <= 0) return toast.warning('Invalid Password.')
    if(newUser.password.trim() !== rePass.rePassword.trim()) return toast.warning('Password Mismatch.')
    const result = await createNewUser()
    if(!result.status) return toast.warning(result.msg)
    localStorage.setItem('auth-token', result.authToken)
    setAuthToke(result.authToken)
    toast.success('Signup Successfully.')
    getAllBlogs(result.authToken)
    setTimeout(() => {
      navigate('/admin')
    }, 2000)
  }
  const goToHome = () => {
    localStorage.setItem('isAdmin', 'false')
    navigate('/')
  }

  return (
    <div className='container-fluid admin-signup'>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container">
        
        <div className="form">
            <p className='title'>Free Sign Up.</p>
            <input className='signup-input' name='username' type='text' placeholder='Username' onChange={e => onChangeHandler(e)} required/>
            <input className='signup-input' name='email' type='email' placeholder='Email.' onChange={e => onChangeHandler(e)} required/>
            <input className='signup-input' name='password' type='password' placeholder='Password' onChange={e => onChangeHandler(e)} required/>
            <input className='signup-input' name='rePassword' type='password' placeholder='Re-Password' onChange={e => onChangePassHandler(e)} required/>
            <button className='signup-btn' onClick={() => onClickSignupHandler()}>Sign Up</button>
            <p className='account'><span>I have an Account?</span><Link to='/admin/login' className='login'> Login</Link></p><br></br>
            <div className='d-flex go-to-home' onClick={() => goToHome()}><i class="fa-solid fa-circle-arrow-left" title='Go To Home'></i></div>
        </div>
      </div>
    </div>
  )
}

export default Signup
