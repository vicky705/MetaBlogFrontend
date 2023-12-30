import React, {useContext, useEffect, useState} from 'react'
import Banner from '../Images/banner.png'
import Blogcard from './Blogcard'
import blogContext from '../Context/blogContext'
function Home() {

  const {blogs, getAllBlogs} = useContext(blogContext)
  
  useEffect(() => {
    getAllBlogs()
  }, [])
  return (
    <div>
      <div className="container-fluid home">
        <div className="container">
            <div className="banner">
                <img src={Banner} />
                <div className="banner-card">
                    <div className="inner-card">
                        <button className='tags bg-primary'>Technology</button>
                        <p className='title'>The Imapct of Tecnology on the Workplace: How Technology is Changing</p>
                        <div className="auther-details d-flex">
                            <div className="profile-img">
                                <img src='https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg' />
                            </div>
                            <div className="auther-name"><p>Vicky Kumar</p></div>
                            <div className="date-time"><p>August 20, 2023</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div className="container-fluid latest-post">
        <div className="container">
            <p className='l-title'>Latest Post</p>
            <div className="row">
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

export default Home
