import express from 'express';
import User from '../models/User.js';
import bycrpt from 'bcryptjs'

export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        res.status(400).send(error);
        return console.log(error);
    }

    if (!users) {
        return res.status(404).json({ message: "no user found" });
    } else {
        res.status(200).json({ users: users });
    }
}


export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        return console.log(error);
    }

    if (existingUser) {
        return res.status(400).json({ message: "User Already Exist! Login Instead " });
    }

    const hashedPassword = bycrpt.hashSync(password);
    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: [],
    })

    try { 
        await user.save();
    } catch (error) {    
        return console.log(error);
    }
    return res.status(201).json({ user });
}


export const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        res.status(400).json({message: "Incorrect Credential"});
        return console.log(error.data);
    }

    if (!existingUser) {
        return res.status(404).json({ message: "User Not Registered"});
    }

    const isPasswordCorrect  = bycrpt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect Credentials"});
    }
    
    res.status(200).json({message: "Login Successful", user: existingUser});

}

