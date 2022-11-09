import mongoose from 'mongoose';
// import Blog from './Blog';

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true        
    },
    email: {
        type: String, 
        required: true,
        unique: true
    }, 
    password: {
        type: String, 
        required: true, 
        minlength: 6
    },
    blogs: [{type: mongoose.Types.ObjectId, ref: "Blog", required: true}]
})

const User = new mongoose.model('User', userSchema);

export default User;