import React, { useEffect, useState } from "react";
import BlogContext from "./blogContext";
const BASE_URL_USER = "http://localhost:4000/api/user"
const BASE_URL_BLOG = "http://localhost:4000/api/blog"



const AdminState = (props) => {
    const [authToken, setAuthToke] = useState()
    const [blogs, setBlogs] = useState([])
    const [editBlog, setEditBlog] = useState({
        title : "",
        blogbody : "",
        category : "",
        tags : [],
        status : '0'
    })
    const [profile, setProfile] = useState({
        name : "",
        email : "",
        username : "",
        gender : "",
        profile : "",
        address : {
          addressline : "",
          city : "",
          state : "",
          country : "",
          pincode : ""
        },
        password : ""
       })

    const [loginDetails, setLoginDetails] = useState({
        email : "",
        password : ""
    })

    const [newUser, setNewUser] = useState({
        name : "",
        email : "",
        username : "",
        gender : "",
        profile : "",
        address : {
          addressline : "",
          city : "",
          state : "",
          country : "",
          pincode : ""
        },
        password : ""
    })

    useEffect(() => {
        const token = localStorage.getItem('auth-token')
        if(token){
            setAuthToke(token)
            getUserProfile(token)
            getAllBlogs(token)
        }
    }, [])

    const getUserProfile = async(token) => {
        const response = await fetch(`${BASE_URL_USER}/getuser`, {
            method : "POST",
            headers : {
                'Content-type' : 'application/json',
                'auth-token' : authToken || token
            },
            body : JSON.stringify({})
        })
        const user = await response.json()
        setProfile(user.users)
    }

    const updateProfileHandler = async(data) => {
        const response = await fetch(`${BASE_URL_USER}/updateprofile`, {
            method : "PUT",
            headers : {
                'Content-type' : 'application/json',
                'auth-token' : authToken
            },
            body : JSON.stringify(data)
        })
        const res_user = await response.json()
        if(res_user.status) setProfile(res_user.user)
        return res_user
    }

    const getAllBlogs = async(token) => {
        const response = await fetch(`${BASE_URL_BLOG}/getallblogs`, {
            method : "POST",
            headers : {
                'Content-type' : 'application/json',
                'auth-token' : authToken || token
            },
            body : JSON.stringify({})
        })
        const blog = await response.json()
        setBlogs(blog)
    }   
    const addBlogs = (data) => {
        setBlogs(blogs.concat(data))
    }

    const updateABlog = async(index) => {
        const response = await fetch(`${BASE_URL_BLOG}/updateblog`, {
            method : "PUT",
            headers : {
                'Content-type' : 'application/json',
                'auth-token' : authToken
            },
            body : JSON.stringify(editBlog)
        })
        const result = await response.json()
        if(!result.status) return result
        const up = [...blogs]
        up[index] = result.update
        setBlogs(up)
        return result 
    }

    const deleteABlog = async(id) => {
        const response = await fetch(`${BASE_URL_BLOG}/blogdelete`, {
            method : "DELETE",
            headers : {
                'Content-type' : 'application/json',
                'auth-token' : authToken
            },
            body : JSON.stringify({'blogid' : id})
        })
        const result = await response.json()
        setBlogs(blogs.filter((item) => item._id.toString() !== id))
        return result
    }

    const login = async() => {
        const response = await fetch(`${BASE_URL_USER}/loginuser`, {
            method : "POST",
            headers : {
                'Content-type' : 'application/json',
            },
            body : JSON.stringify(loginDetails)
        })
        const token = await response.json()
        if(token.status){
            setAuthToke(token.authToken)
        }
        return token
    }

    const createNewUser = async() => {
        const response = await fetch(`${BASE_URL_USER}/createuser`, {
            method : "POST",
            headers : {
                'Content-type' : 'application/json',
            },
            body : JSON.stringify(newUser)
        })
        const result = await response.json()
        if(result.state) {
            setAuthToke(result.authToken)
        }
        return result
    }

    const logout = () => {
        if(authToken){
            localStorage.removeItem('auth-token');
            setAuthToke('')
            localStorage.setItem('isAdmin', 'false')
        }
    }

    return (
        <BlogContext.Provider value={{blogs, profile, setProfile, updateProfileHandler, addBlogs, authToken, setAuthToke, editBlog, setEditBlog, updateABlog, deleteABlog, logout, loginDetails, setLoginDetails, login, getAllBlogs, getUserProfile, newUser, setNewUser, createNewUser}}>
            {props.children}
        </BlogContext.Provider>
    )
}
export default AdminState