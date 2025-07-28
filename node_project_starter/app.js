import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import routes from './routes/index.js';
import mongoose from 'mongoose';

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}));
  

app.use(cors());
app.use(express.json());
app.use('/api', routes);


mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('MongoDB connected')).catch(err => console.error('MongoDB connection error:', err));

export default app;
