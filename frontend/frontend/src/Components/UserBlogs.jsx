import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Blog from './Blog';
const UserBlogs = () => {

  const [user, setUser] = useState()
  const id = localStorage.getItem('userId');
  const sendRequest = async() => {
    let response; 
    try {
      response = await axios.get(`http://localhost:5000/api/blog/user/${id}`);      
    } catch (error) {
      console.log(error);      
    }
    const data = await response.data.user;   
    return data; 
  }
  useEffect(() => {
    sendRequest().then((data) => setUser(data));
  },[])

  return (
    <div>
      {user && user.blogs && user.blogs.map((blog, index) => {
         return(
          <Blog 
            id={blog._id}
            isUser={true}
            key={index} 
            title={blog.title} 
            description={blog.description} 
            imageURL={blog.image} 
            userName={user.name} 
            />
          )
      })}
    </div>
  )
}

export default UserBlogs