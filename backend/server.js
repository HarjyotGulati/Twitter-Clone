import express from 'express';
import authRoutes from './routes/auth.router.js';
import dotenv from 'dotenv';
import connectDB from './db/connectMondoDB.js'
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000

app.use(express.json()) //to parse req.body;
app.use(express.urlencoded({extended:true})) // to pars form data
app.use(cookieParser());
app.use('/api/auth',authRoutes);



app.listen(port,()=>{
    console.log(`Server is listening at PORT:${port}`);
    connectDB();
})