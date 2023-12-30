import React, { useContext, useRef, useState } from 'react'
import JoditEditor from 'jodit-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import blogContext from '../Context/blogContext';
import { useNavigate } from 'react-router-dom';
const BASE_URL = "http://localhost:4000/api/blog"


function Addablog() {

  const {addBlogs, authToken} = useContext(blogContext)
  const navigate = useNavigate()
  const editor = useRef(null)
  
  // console.log(authToken)

  const [blog, setBlog] = useState({
    title : "",
    blogbody : "",
    category : "",
    tags : [],
    status : '0'
  })

  const addTagsHandler = (event) => {
    if(event.key !== 'Enter') return
    const text = event.target.value
    if(!text.trim()) return
    setBlog((prevBlog) => ({
      ...prevBlog,
      tags: [...prevBlog.tags, text]
    }));
    event.target.value = ''
  }
  const removeTagsHandler = (idx) => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      tags: prevBlog.tags.filter((ele, i) => i !== idx)
    }));
  } 

  const [categoryList, setCategoryList] = useState([
    "Technical", "Hr", "Coding", "Hacking"
  ])


  const onChangeHandler = (event) => {
    setBlog({...blog, [event.target.name] : event.target.value})
  }


  const onClickPostHandler = async() => {
    if(blog.title.trim().length <= 0) return toast.warning("Please provide title ?")
    if(blog.blogbody.trim().length <= 0) return toast("Please write something in body of blog ?")
    if(blog.category.trim().length <= 0) return toast("Please select Category for blog ?")

    const response = await fetch(`${BASE_URL}/uploadblog`, {
      method: "POST",
      headers: {
        'Content-type' : 'application/json',
        'auth-token': authToken
      },
      body: JSON.stringify(blog)
    })
    const data = await response.json()
    if(data.status) {
      addBlogs(data.blog)
      toast.success("congratulations a new Blog is posted.")
      setTimeout(() => {
        navigate('/admin/blogs')
      }, 2000)
    }
    else return toast.warning(data.msg)
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

            <input type='text' name='title' className='input-title mt-3' placeholder='Title' onChange={e => onChangeHandler(e)}/>
            <JoditEditor className='text-editor mt-3' ref={editor} value={blog.blogbody} onChange={newContent => {setBlog({...blog, blogbody : newContent})}}/>

            <div className="category mt-3">
              <select name='category' onChange={e => onChangeHandler(e)}>
                <option value={""}>Select Category.</option>
                {categoryList.map((item) => {
                  return (
                    <option value={item}>{item}</option>
                  )
                })}
              </select>
            </div>

            <div className='visibility mt-3'>
              <select name='status' onChange={e => onChangeHandler(e)}>
                <option value={0}>Private</option>
                <option value={1}>Public</option>
                <option value={2}>Unlisted</option>
              </select>
            </div>

            <div className="input-tags mt-3">
              {blog.tags.map((item, idx) => {
                return (<div className="tags">
                  <span className='text'>{item}</span>
                  <span className='close' onClick={() => {removeTagsHandler(idx)}}><i className="fa-solid fa-xmark"></i></span>
                </div>)
              })}<input type='text' className='tags-input-field' placeholder='Tags .....' onKeyDown={e => addTagsHandler(e)}/>
            </div>
            <button className={`postBtn mt-3`} onClick={() => onClickPostHandler()}>Post</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Addablog
