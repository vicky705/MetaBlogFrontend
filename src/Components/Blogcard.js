import React from 'react'
import image from '../Images/blog.png'
import { useNavigate } from 'react-router-dom'

function Blogcard(props) {
  const navigate = useNavigate()
  const onClickHandlerForBlog = (id) => {
  navigate(`/Blog/${id}`)
    // console.log(props)
  }
  return (
    <div>
      <div className="blog-card" onClick={() => onClickHandlerForBlog(props.data._id)}>
        <div>
            <img src={image} /><br></br>
            <button className='btn'>{props.data.category}</button>
            <p className='title'>{props.data.title}</p>
            <div className="auther-details d-flex mt-2">
                <div className="profile-img">
                    <img src={props.data.blogerid[0].profile} />
                </div>
                <div className="auther-name"><p>{props.data.blogerid[0].name}</p></div>
                <div className="date-time"><p>{new Date(props.data.dateandtime).toLocaleString()}</p></div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Blogcard
