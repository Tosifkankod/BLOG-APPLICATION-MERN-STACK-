import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routes/blog_routes.js';
import router from './routes/user_routes.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/user', router);  
app.use('/api/blog', blogRouter);

mongoose.connect(
    'mongodb+srv://admin:admin123@cluster0.mfxoyhq.mongodb.net/Blog?retryWrites=true&w=majority'
).then(() => {
    app.listen(5000,(error) => {
        console.log('Connected to Data base & listening to port 5000');
    });     
}).catch((error) => {
    console.log('error');
})