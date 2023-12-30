import React, { useContext, useEffect } from 'react'
import blogContext from '../Context/blogContext'


function Mainbody() {
    
    const {blogs, profile, getUserProfile} = useContext(blogContext)
    const unlisted = blogs.filter((item) => item.status === 2)
    const views = blogs.reduce((sum, item) => sum + item.views, 0)

    useEffect(() => {
        getUserProfile()
    }, [])

    console.log(profile)

  return (
    <div className="container-fluid main-body">
        <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="card-total card1">
                    <div>
                        <i class="fa-solid fa-layer-group"></i>
                        <p className='card-title'>Total Blogs</p>
                        <p className='text'>{blogs.length}</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="card-total card2">
                    <div>
                        <i class="fa-solid fa-eye-slash"></i>
                        <p className='card-title'>Unlisted Blogs</p>
                        <p className='text'>{unlisted.length}</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="card-total card3">
                    <div>
                        <i class="fa-solid fa-snowflake"></i>
                        <p className='card-title'>Total View</p>
                        <p className='text'>{views}</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="card-total card4">
                    <div>
                        <i class="fa-regular fa-comments"></i>
                        <p className='card-title'>Total Comments</p>
                        <p className='text'>50</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Mainbody