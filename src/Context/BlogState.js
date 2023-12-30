import React, { useContext, useEffect, useState } from "react";
import BlogContext from './blogContext'
const BASE_URL = "http://localhost:4000/blogs"
// const BASE_URL = "http://192.168.19.125:4000/blogs"


const BlogState = (props) => {
    const [blogs, setBlogs] = useState([])
    const [blog, setBlog] = useState({})

    useEffect(() => {
        getAllBlogs()
    }, [])
    const getAllBlogs = async() => {
        const response = await fetch(`${BASE_URL}/getallblogs`)
        const data = await response.json()
        setBlogs(data.blogs);
    }
    
    const getBlogsById = async(id) => {
        const response = await fetch(`${BASE_URL}/getblogsbyid`, {
            method : "POST",
            headers : {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({blogid : id})
        })
        const data = await response.json()
        setBlog(data.blogs[0])
    }

    const updateView = async(id) => {
        const response = await fetch(`${BASE_URL}/views`, {
            method : "POST",
            headers : {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({blogid : id})
        })
        const data = await response.json()
    }

    return (
        <BlogContext.Provider value={{blogs, blog, getBlogsById, updateView, getAllBlogs}}>
            {props.children}
        </BlogContext.Provider>
    )
}
export default BlogState