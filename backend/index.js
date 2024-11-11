import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const databaseUrl = process.env.DATABASE_URL;



const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    }
);

app.use(cors());
app.use(express.json());

mongoose.connect(databaseUrl ).then(() => {
    console.log('Connected to database');
}
).catch((error) => {
    console.log('Error connecting to database', error);
}
);