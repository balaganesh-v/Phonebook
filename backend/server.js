import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("PhoneBook Backend API Running ❤️");
});


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
