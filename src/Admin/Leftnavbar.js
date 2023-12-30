import React from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Leftnavbar(props) {
    const leftnav = props.data;
    const location = useLocation()
  return (
    <div className={`conatiner-fluid leftnav ${leftnav ? "" : "d-none"}`}>
        <div className="leftnav-inner">
            <div className="profile">
                <img src='https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg' />
            </div><br></br>
            <hr></hr>
            <ul className='menu'>
                
                <li className={`d-flex ${location.pathname === '/admin' ? 'active' : ''}`}><Link to='/admin'><i class="fa-solid fa-layer-group"></i> Dashboard</Link></li>
                <li className={`d-flex ${location.pathname === '/admin/blogs' ? 'active' : ''}`}><Link to='/admin/blogs'><i class="fa-solid fa-paperclip"></i> Blogs</Link></li>
                <li className='d-flex'><Link to=''><i class="fa-regular fa-comments"></i> Comments</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Leftnavbar
