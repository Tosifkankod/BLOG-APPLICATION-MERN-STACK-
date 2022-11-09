import React, { useEffect } from 'react';
import { Route, Routes, useNavigate} from 'react-router-dom';
import Header from "./Components/Header";
import Auth from './Components/Auth';
import Blogs from './Components/Blogs';
import UserBlogs from './Components/UserBlogs';
import BlogDetail from './Components/BlogDetail';
import AddBlog from './Components/AddBlog';
import { useSelector } from 'react-redux';

function App() {
  const params = window.location.href;
  const navigate = useNavigate()  ;
  // useEffect(() => {

  // }, params)
  
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? <Route path='/auth' element={<Auth />} /> :
            <>
              <Route path='/blogs' element={<Blogs />} />
              <Route path='/blogs/add' element={<AddBlog />} />
              <Route path='/myBlogs' element={<UserBlogs />} />
              <Route path='/myBlogs/:id' element={<BlogDetail />} />
            </>
          }
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
