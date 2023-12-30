import React, { useContext, useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import blogContext from '../Context/blogContext';

function Topnavbar(props) {
  const handleLeftNav = props.data;
  const [option, setOption] = useState(true)

    const navigate = useNavigate()

  const onClickOptionHander = () => {
    setOption(!option)
  }
  const {logout} = useContext(blogContext)
  const onClickLogoutHandler = async() => {
    await logout()
    navigate('/')
  }
  return (
    <div className="container-fluid dashboard">
        <div className="row">
            <div className="col-4">
                <div className="title d-flex"><i class="fa-solid fa-bars-staggered" onClick={() => handleLeftNav()}></i><p>Dashboard</p></div>
            </div>
            <div className="col-8">
                <div className="d-flex profile-option">
                    <div className="search d-flex">
                        <input type='text' placeholder='Search...'/>
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div className="profile">
                        <img src='https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg' onClick={() => onClickOptionHander()}/>
                    </div>
                    <div className={`option ${option ? 'd-none' : ''}`}>
                        <ul>
                            <li><div className='d-flex profile'>
                            <i class="fa-regular fa-user"></i>
                                <Link to='/admin/profile' onClick={() => onClickOptionHander()}> Profile</Link>
                            </div></li>
                            <li><div className="d-flex logout">
                                <i class="fa-solid fa-right-to-bracket"></i>
                                <Link onClick={() => onClickLogoutHandler()}>Logout</Link>
                            </div></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </div>
  )
}

export default Topnavbar
