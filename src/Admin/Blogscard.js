import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import blogContext from '../Context/blogContext'
import { ToastContainer , toast } from 'react-toastify'

function Blogscard(props) {

  const {setEditBlog, deleteABlog} = useContext(blogContext)
  const navigate = useNavigate()

  const onClickUpdateHandler = (index, data) => {
    setEditBlog(data)
    navigate(`/admin/blogs/${index}`)
  }
  const onClickDeleteHandler = async(index, id) => {
    const response = await deleteABlog(id)
    if(!response.status) return toast.warning(response.msg)
    toast.success(response.msg)
  }
  return (
    <div className='test'>
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
      <div className="container-fulid admin-blog-card">
        <div className="container inner-card">
          <div className="row">
            <div className="col-1">
              <p className='sno'>{props.index+1}.</p>
            </div>
            <div className="col-7">
              <p className='title'>{props.data.title}</p>
            </div>
            <div className="col-2 vis">
              <p className={`visibility ${props.data.status === 1 ? 'public' : props.data.status === 2 ? 'unlisted' : 'private'}`}>{props.data.status === 1 ? 'Public' : props.data.status === 2 ? 'Unlisted' : 'Private'}</p>
            </div>
            <div className="col-2 option">
              <div className=''>
                <i className="fa-solid fa-pencil" onClick={() => onClickUpdateHandler(props.index, props.data)}></i>
                <i class="fa-regular fa-trash-can" onClick={() => onClickDeleteHandler(props.index, props.data._id)}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blogscard
