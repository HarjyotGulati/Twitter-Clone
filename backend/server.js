import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';

import postRoutes from './routes/post.route.js'
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import notificationRoutes from './routes/notification.route.js';

import connectDB from './db/connectMondoDB.js'

dotenv.config();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});


const app = express();
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json()) //to parse req.body;
app.use(express.urlencoded({extended:true})) // to pars form data

app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/auth',userRoutes);
app.use('/api/posts',postRoutes);
app.use("/api/notifications", notificationRoutes);



app.listen(port,()=>{
    console.log(`Server is listening at PORT:${port}`);
    connectDB();
})