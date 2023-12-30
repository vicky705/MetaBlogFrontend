import React, { useContext, useRef, useState } from 'react'
import JoditEditor from 'jodit-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import blogContext from '../Context/blogContext';
const BASE_URL = "http://localhost:4000/api/blog"

function Updateblog() {

    const navigate = useNavigate()
    const {id} = useParams()
    const {editBlog, setEditBlog, updateABlog} = useContext(blogContext)
    
    const editor = useRef(null)
    const addTagsHandler = (event) => {
        if(event.key !== 'Enter') return
        const text = event.target.value
        if(!text.trim()) return
        setEditBlog((prevBlog) => ({
        ...prevBlog,
        tags: [...prevBlog.tags, text]
        }));
        event.target.value = ''
    }
    const removeTagsHandler = (idx) => {
      setEditBlog((prevBlog) => ({
        ...prevBlog,
        tags: prevBlog.tags.filter((ele, i) => i !== idx)
        }));
    } 

    const [categoryList, setCategoryList] = useState([
        "Technical", "Hr", "Coding", "Hacking"
    ])


    const onChangeHandler = (event) => {
        setEditBlog({...editBlog, [event.target.name] : event.target.value})
    }


    const onClickPostHandler = async() => {
        if(editBlog.title.trim().length <= 0) return toast.warning("Please provide title ?")
        if(editBlog.blogbody.trim().length <= 0) return toast.warning("Please write something in body of blog ?")
        if(editBlog.category.trim().length <= 0) return toast.warning("Please select Category for blog ?")
        const result =await updateABlog(id)
        if(!result.status) return toast.warn(result.msg)
        toast.success("Done")
        setTimeout(() => {
          navigate('/admin/blogs')
        }, 2000)

    }

  return (
    <div>
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
      <div className="container-fluid addblog">
        <div className="container">
          <h4 className=''>Add new post</h4>
          <div className="form">

            <input type='text' name='title' className='input-title mt-3' value={editBlog.title} placeholder='Title' onChange={e => onChangeHandler(e)}/>
            <JoditEditor className='text-editor mt-3' ref={editor} value={editBlog.blogbody} onChange={newContent => {setEditBlog({...editBlog, blogbody : newContent})}}/>

            <div className="category mt-3">
              <select name='category' onChange={e => onChangeHandler(e)}>
                <option value={""}>Select Category.</option>
                {categoryList.map((item) => {
                  return (
                    <option value={item} selected={editBlog.category === `${item}`}>{item}</option>
                  )
                })}
              </select>
            </div>

            <div className='visibility mt-3'>
              <select name='status' onChange={e => onChangeHandler(e)}>
                <option value={0} selected={editBlog.status == 0}>Private</option>
                <option value={1} selected={editBlog.status == 1}>Public</option>
                <option value={2} selected={editBlog.status == 2}>Unlisted</option>
              </select>
            </div>

            <div className="input-tags mt-3">
              {editBlog.tags.map((item, idx) => {
                return (<div className="tags">
                  <span className='text'>{item}</span>
                  <span className='close' onClick={() => {removeTagsHandler(idx)}}><i className="fa-solid fa-xmark"></i></span>
                </div>)
              })}<input type='text' className='tags-input-field' placeholder='Tags .....' onKeyDown={e => addTagsHandler(e)}/>
            </div>
            <button className={`postBtn mt-3`} onClick={() => onClickPostHandler()}>Update</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Updateblog
