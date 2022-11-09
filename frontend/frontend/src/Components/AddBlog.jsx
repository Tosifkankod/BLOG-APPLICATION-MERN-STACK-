import { Box, Typography, InputLabel, TextField, Button  } from "@mui/material";
import React from "react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const labelStyles = {mb: 1, mt: 2, fontSize: '24px', fontWeight:'bold'};
const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: ""
  })

  const handleChange = (e) =>{
    setInputs((prevstate) => {
        return {
          ...prevstate,
          [e.target.name]: e.target.value
        }
    })
  }

  const sendRequest = async() =>{
    const res = await axios.post("http://localhost:5000/api/blog/add", {
      title: inputs.title, 
      description: inputs.description, 
      image: inputs.imageURL, 
      user: localStorage.getItem('userId')
    }).catch(err => console.log(err));
    const data = await res.data; 
    return data;     
  }



  const handleSubmit = (e) =>{
      e.preventDefault();
      
      sendRequest().then((data) => {          
          console.log(data);
          if(data){
            alert('posted Successfully')
            navigate('/myblogs');
            window.location.reload();
          }
      });

      
  }


  return (
    <div>
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

          <InputLabel sx={labelStyles} >ImageURL</InputLabel>
          <TextField value={inputs.imageURL} onChange={handleChange} name="imageURL" margin="normal" variant="outlined" />

          <Button sx={{mt: 2, borderRadius: 4}} variant='contained' color="warning" type='submit' >Submit</Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
