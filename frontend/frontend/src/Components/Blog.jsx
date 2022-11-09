import React from 'react'
import { Card, CardHeader, CardMedia, CardContent, Typography, Avatar, IconButton, Box } from '@mui/material'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Blog = ({title, description, imageURL, userName, isUser, id}) => {    
    const navigate = useNavigate();
    const handleEdit = () => {
        console.log(id);
        navigate(`/myBlogs/${id}`);
    }

    const deleteRequest = async() =>{
        try {
            const res = await axios.delete(`http://localhost:5000/api/blog/${id}`).catch(err => console.log(err));
            const data = await res.data; 
            return data; 
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = () => {
        deleteRequest().then((data) => {
            console.log(data);
            if(data){
              alert('deleted Successfully');
              navigate('/');
            }
        }).then(() => {
            navigate('/blogs');
            window.location.reload();
        })
    }   

    return (
        <div>
            <Card sx={{ width: "40%", margin: 'auto',mt: 2, mb:2, padding: 2, boxShadow: "5x 5px 10px #ccc", ":hover": {
                boxShadow: "10px 10px 20px #ccc"
            }}}>
                {isUser && (
                    <Box display="flex">
                        <IconButton onClick={handleEdit} sx={{marginLeft: 'auto'}} >
                            <ModeEditOutlineIcon color="warning" />
                        </IconButton>
                        <IconButton onClick={handleDelete} >    
                            <DeleteOutlineIcon color="error"/>
                        </IconButton>                        
                    </Box>
                )}
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                           {userName.charAt(0)} 
                        </Avatar>
                    }
                    title={title}
                    subheader="September 14, 2016"
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={imageURL}
                    alt="Paella dish"
                />

                <CardContent>
                    <hr />
                    <br />
                    <Typography variant="body2" color="text.secondary">
                        <b>{userName}</b>{": "} {description}
                    </Typography>   
                </CardContent>                
            </Card>
        </div>
    )
}

export default Blog