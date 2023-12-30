import React, { useContext } from 'react'
import Blogscard from './Blogscard'
import blogContext from '../Context/blogContext'
import { Link } from 'react-router-dom'


function Blogs() {
  const { blogs } = useContext(blogContext)

  return (
    <div className='blogList'>
      <Link to='/admin/write-a-blog'><div className='addNewBlogBtn'><i class="fa-solid fa-location-arrow"></i><span className='text'>Add New Blogs</span></div></Link>
      {
        blogs.map((item, index) => {
          return (
            <Blogscard data={item} index={index}/>
          )
        })
      }
    </div>
  )
}

export default Blogs