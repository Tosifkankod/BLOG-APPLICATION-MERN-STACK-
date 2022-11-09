import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Blog from './Blog'

const Blogs = () => {
  const [blogs, setBlogs] = useState()
  const sendRequest = async() =>{
    try {
      const res = await axios.get('http://localhost:5000/api/blog');      
      const data = await res.data;
      return data; 
    } catch (error) {
      console.log(error);      
    }
  }

  useEffect(() => {
    sendRequest().then(data => setBlogs(data.blogs));    
  }, []) 
  
  return (
    <div>
      {blogs && blogs.map((blog, index) => {
         return( 
            <Blog
              id={blog._id}
              isUser={localStorage.getItem('userId') === blog.user._id} 
              key={index} 
              title={blog.title} 
              description={blog.description} 
              imageURL={blog.image} 
              userName={blog.user.name} 
            />
         )
      })}
    </div>
  )
}

export default Blogs