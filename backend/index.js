import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/AuthRouter.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const databaseUrl = process.env.DATABASE_URL;


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    }
);

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);


mongoose.connect(databaseUrl ).then(() => {
    console.log('Connected to database');
}
).catch((error) => {
    console.log('Error connecting to database', error);
}
);