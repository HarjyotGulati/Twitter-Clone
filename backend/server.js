import express from 'express';
import authRoutes from './routes/auth.router.js';
import dotenv from 'dotenv';
import connectDB from './db/connectMondoDB.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 5000

app.use('/api/auth',authRoutes)

app.get("/",(req,res)=>{
    res.send("Server is ready");
})

connectDB();

app.listen(port,()=>{
    console.log(`Server is listening at PORT:${port}`);
})