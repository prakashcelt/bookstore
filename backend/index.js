import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import booksRoute from "./routes/booksRoute.js"

// Define __filename and __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the specified path
const customEnvPath = path.resolve(__dirname, '../.env'); // Adjust this path as needed
dotenv.config({ path: customEnvPath });

const app = express();

app.use(express.json());
app.use(cors());

app.use('/books', booksRoute);

// Serve static files
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

console.log('DBURL:', process.env.DBURL);
console.log('PORT:', process.env.PORT);

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
