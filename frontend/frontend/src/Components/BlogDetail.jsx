import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' };

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState()
  const id = useParams().id;

  const [inputs, setInputs] = useState()

  const handleChange = (e) => {
    setInputs((prevstate) => {
      return {
        ...prevstate,
        [e.target.name]: e.target.value
      }
    })
  }

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blog/${id}`).catch((err) => {
        console.log(err);
      })
      const data = await res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data);
      setInputs({
        title: data.title,
        description: data.description,
      })
    })
  }, [id])

  const sendRequest = async() => {
      try {
        const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`, {
          title: inputs.title, 
          description: inputs.description,
          imageURL: inputs.image
        }).catch(err => console.log(err));
        const data = await res.data; 
        return data; 
      } catch (error) {
          console.log(error);
      } 
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs)
    sendRequest().then((data) => {
      if(data){
        alert('updated Successfully');
        navigate('/myBlogs');
        window.location.reload();
      }
    })

  }

  return (
    <div>
      {inputs &&
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor='linear-gradient(to right, #ffa17f, #00223e)'
            borderRadius={10}
            boxShadow="10px 10px 10px #ccc"
            padding={3}
            margin={"auto"}
            marginTop={3}
            display="flex"
            flexDirection="column"
            width="80%"
          >
            <Typography fontWeight={'bolx'} padding={3} color='grey' variant="h2" textAlign={'center'} >Post Your Blog</Typography>
            <InputLabel sx={labelStyles} >Title</InputLabel>
            <TextField value={inputs.title} onChange={handleChange} name="title" margin="normal" variant="outlined" />

            <InputLabel sx={labelStyles} >Description</InputLabel>
            <TextField value={inputs.description} onChange={handleChange} name="description" margin="normal" variant="outlined" />           

            <Button sx={{ mt: 2, borderRadius: 4 }} variant='contained' color="warning" type='submit' >Submit</Button>
          </Box>
        </form>
      }
    </div>
  )
}

export default BlogDetail