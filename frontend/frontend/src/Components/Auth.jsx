import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import axios from 'axios';
import {useDispatch} from 'react-redux'
import {authActions} from '../store/index'
import {useNavigate} from 'react-router-dom'
import { useEffect } from "react";

const Auth = () => {
  const [errormsg, setErrormsg] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
      name: "",email: "", password: "" 
  })

  const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState, 
        [e.target.name]: e.target.value
      }))
  }
  
  const sendRequest = async(type="login") =>{
    let response; 
      response = await axios.post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name, 
        email: inputs.email, 
        password: inputs.password
      }).catch((err) => {
          console.log(err.response.data.message)
          setErrormsg(err.response.data.message);
      })      
      const data = await response.data; 
      return data; 
  }

  const handleSubmit = (e) =>{
      e.preventDefault();
      if(isSignup){
        sendRequest("signup")
          .then((data) => {localStorage.setItem('userId', data.user._id)})
          .then(() => dispatch(authActions.login()))
          .then(()=> navigate('/blogs'))          
      }else{
        sendRequest()
        .then((data) => localStorage.setItem('userId', data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(()=> navigate('/blogs'))          
      }
      if(errormsg){
        setErrormsg();
      }
  }
 
  const [isSignup, setIsSignup] = useState(false);
  return (
    <div>
      <form onSubmit={handleSubmit} >
        <Box
          maxWidth={400}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h4" padding={3} textAlign='center' >{isSignup ? "Signup": "Login"}</Typography>

          {isSignup && <TextField onChange={handleChange} name="name" value={inputs.name} placeholder="Name" margin="normal" />}
          <TextField onFocus={() => setErrormsg()} onChange={handleChange} name="email" value={inputs.email} type={'email'} placeholder="Email" margin="normal" />
          <TextField onFocus={() => setErrormsg()} onChange={handleChange} name="password" value={inputs.password} type={'password'} placeholder="Password" margin="normal" />
          {errormsg && <Alert variant="outlined" severity="warning">{errormsg}</Alert>}

          <Button type="submit" variant="contained" sx={{borderRadius: 3, marginTop: 3}} color="warning">Submit</Button>
          <Button onClick={() => setIsSignup(!isSignup)} sx={{borderRadius: 3, marginTop: 3}}>{isSignup ? "existing user Login": "New user signup"}</Button>
        </Box>
      </form>
    
    </div>
  );
};

export default Auth;
