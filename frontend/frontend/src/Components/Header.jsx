import React from 'react';
import { AppBar, Button, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';
import { useEffect } from 'react';

const Header = () => {
  const [value, setValue] = useState(0);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('userId')){
      dispatch(authActions.login());
    }    
  }, [])
  
  const homenavigate = () =>{
      navigate('/blogs');
  }

  return (
    <AppBar position='sticky' sx={{ background: 'linear-gradient(to right, #ffa17f, #00223e);' }}>
      <Toolbar>

        <Typography sx={{cursor: 'pointer'}} onClick={homenavigate} variant='h4'>BlogsApp</Typography>

        {isLoggedIn && <Box display='flex' marginLeft={'auto'} marginRight={'auto'}>
            <Tabs textColor='inherit' value={value} onChange={(e, val) => setValue(val)} >
              <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
              <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
              <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" />
            </Tabs>
          </Box>
        }

        <Box display="flex" marginLeft="auto">
                  
          { (!localStorage.getItem('userId')) && !isLoggedIn &&
            <>
            <Button LinkComponent={Link} to="/auth" variant='contained' sx={{ margin: 1, borderRadius: 10 }} color='warning'>Login</Button>

            {/* <Button LinkComponent={Link} to="/auth" variant='contained' sx={{ margin: 1, borderRadius: 10 }} color='warning'>Signup</Button> */}
            </>
          }

          {isLoggedIn && <Button LinkComponent={Link} onClick={() => {
              localStorage.clear();
              dispatch(authActions.logout()) 
              navigate('/auth')                         ;
          }} to="/auth" variant='contained' sx={{ margin: 1, borderRadius: 10 }} color='warning'>Logout</Button>}
        
        </Box>

      </Toolbar>

    </AppBar>
  )
}

export default Header