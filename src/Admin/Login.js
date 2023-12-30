import React, { useContext } from 'react'
import blogContext from '../Context/blogContext'
import { ToastContainer, toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()

  const {loginDetails, setLoginDetails, login, setAuthToke, getAllBlogs} = useContext(blogContext)

  const onChangeHandler = (event) => {
    setLoginDetails({...loginDetails, [event.target.name] : event.target.value})
  }
  const onClickLoginHandler = async() => {
    const result = await login()
    if(!result.status) return toast.warning(result.msg)
    localStorage.setItem('auth-token', result.authToken)
    setAuthToke(result.authToken)
    toast.success('Login Successfully.')
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
            <p className='title'>Welcome....</p>
            <input className='signup-input' name='email' type='Email' placeholder='Email.' onChange={(e) => onChangeHandler(e)}/>
            <input className='signup-input' name='password' type='password' placeholder='Password' onChange={(e) => onChangeHandler(e)}/>
            <button className='signup-btn' onClick={() => onClickLoginHandler()}>Log In</button>
            <p className='account'><span>I don't have an Account?</span><Link to='/admin/signup'><span className='login'> SignUp</span></Link></p><br></br>
            <div className='d-flex go-to-home' onClick={() => goToHome()}><i class="fa-solid fa-circle-arrow-left" title='Go To Home'></i></div>
        </div>
      </div>
    </div>
  )
}

export default Login
