import React, { useContext, useState } from 'react'
import image from '../Images/banner.png'
import Blogcard from './Blogcard'
import blogContext from '../Context/blogContext'

function Blogs() {
    const {blogs} = useContext(blogContext)
  return (
    <div>
      <div className="container-fluid blogs">
        <div className="container">
            <div className='locater'>
                <p className='title text-center'>Most Popular Blogs</p>
                <p className='path text-center mt-2'><i>Home/Blogs</i></p>
            </div>

            <div className="banner mt-3">
                <img src={image} />
                <div className='banner-details'>
                    <button className='tags' >Technology</button>
                    <p className='title'>The Impact of Technology on the Workplace: How Technology is Changing.</p>
                    <div className="auther-details d-flex">
                        <div className="profile-img">
                            <img src='https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg' />
                        </div>
                        <div className="auther-name"><p>Vicky Kumar</p></div>
                        <div className="date-time"><p>August 20, 2023</p></div>
                    </div>
                </div>
            </div>

            <div className="row mar-top">
            {
                blogs.map((item) => {
                    return (
                        <div className='col-lg-4 col-md-6 col-sm-6 col-12'>
                            <Blogcard data={item}/>
                        </div>           
                    )
                })
            }
            </div>

        </div>
      </div>
    </div>
  )
}

export default Blogs
