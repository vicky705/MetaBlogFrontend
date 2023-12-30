import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import blogContext from '../Context/blogContext';

function Blogviewer() {
    const {id} = useParams();
    const {blog, getBlogsById, updateView} = useContext(blogContext)
    useEffect(() => {
        getBlogsById(id)
    }, [id])

    setTimeout(() => {
        updateView(id)
    }, 5000)
    
  return (
    <div>
        <div className="container-fluid blogviewer">
            <div className="container">
                <p className='category'>{blog.category}</p>
                <p className='title'>{blog.title}</p>
                {blog.blogerid && <div className="auther-details d-flex mt-2">
                    <div className="profile-img">
                        <img src={blog.blogerid[0].profile} />
                    </div>
                    <div className="auther-name"><p>{blog.blogerid[0].name}</p></div>
                    <div className="date-time"><p>{new Date(blog.dateandtime).toLocaleString()}</p></div>
                </div>}

                <div className="blog-body" dangerouslySetInnerHTML={{ __html: blog.blogbody }}>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Blogviewer
