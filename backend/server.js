
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import summaryRoute from "./routes/summary.js"; 
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the backend server of SafeBite!");
});

app.use("/api/summary", summaryRoute);

app.listen(port, () => console.log(`Server is running on port ${port}`));
