import express from 'express';
import dotenv from 'dotenv';
import userAuth from './Router/authRouter.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import userDefine from './Router/UserControllerRouter.js';
import mongoose from 'mongoose';

const app = express();
dotenv.config();

// Middleware
app.use(cors()); // Add CORS middleware
app.use(bodyParser.json()); // Use body-parser middleware

// Routes
app.use('/api/auth', userAuth);
app.use('/api/user', userDefine); // Changed endpoint to avoid conflicts

// Connect to MongoDB
const connect = async () => {
     const mongoURI = "mongodb+srv://abdullah7142312:jaVSWoiE9WR5VWUw@cluster0.e7576.mongodb.net/anas?retryWrites=true&w=majority&appName=Cluster0";

    try {
        await mongoose.connect(mongoURI);
        console.log('Connection successful!');
    } catch (err) {
        console.error('Connection error:', err);
    } 
};



// Start server
app.listen(8300, () => {
    connect();
    console.log('Server running on port 8300');
});
