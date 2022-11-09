import express from 'express';
import Blog from '../models/Blog.js';
import User from '../models/User.js';
import mongoose from 'mongoose';
// *-*-*-*-*-*-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
export const getAllBlogs = async (req, res) => {
    let blogs;
    try {
        blogs = await Blog.find().populate('user');
    } catch (error) {
        return console.log(error);
    }

    if (!blogs) {
        res.status(404).json({ message: "No Blogs Found" });
    }

    return res.status(200).json({ blogs });
}
// *-*-*-*-*-*-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
export const addBlog = async (req, res) => {
    const { title, description, image, user } = req.body;
    let existingUser; 
    try {
        existingUser = await User.findById(user);
    } catch (error) {
        return console.log(error);
    }
    if(!existingUser){
        return res.status(500).json({message: "Unable to Find User By this Id"})
    }

    const blog = new Blog({
        title,
        description,
        image,
        user,
    })  

    try {
        console.log(existingUser);
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error});
    }
    return res.status(200).json({ blog })
}
// *-*-*-*-*-*-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
export const updateBlog = async (req, res) => {
    const {title, description} = req.body; 
    const blogId = req.params.id;
    let blog; 
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title, 
            description
        })                
    } catch (error) {
        return console.log(error);
    }
    if(!blog){
        return res.status(500).json({message: "Unable to Update The Blog"});        
    }
    return res.status(200).json({blog});
}
// *-*-*-*-*-*-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
export const getById = async(req, res) =>{
    let id = req.params.id; 
    let blog; 
    try {
        blog = await Blog.findById(id);        
    } catch (error) {
        return console.log(error);        
    }
    if(!blog){
        return res.status(404).json({message: "No Blog Found"});        
    }

    return res.status(200).json(blog); 
}
// *-*-*-*-*-*-*-*-*-*-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
export const deleteBlog = async (req, res) =>{
    const id = req.params.id; 
    let blog; 
    try { 
        blog = await Blog.findByIdAndRemove(id).populate('user');
        console.log(blog);
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (error) {
        return console.log(error); 
    }
    if(!blog){
        return res.status(500).json({message: "Unable to Delete"});
    }
    return res.status(200).json({message: "Sucessfully Deleted"});    
}
// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
export const getByUserId = async (req, res) =>{
    const userId = req.params.id;     
    let userBlogs; 
    try {
        userBlogs = await User.findById(userId).populate('blogs');
        console.log(userBlogs);
    } catch (error) {
        return console.log(error);
    }
    if(!userBlogs){
        return res.status(404).json({message: "no Blogs Found"});
    }
    return res.status(200).json({user: userBlogs});
}