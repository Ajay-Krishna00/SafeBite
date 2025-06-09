const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const summaryRoute = require("./routes/summary");
const recommendationRoute = require("./routes/recommendation");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the backend server of SafeBite!");
});

app.use("/api/summary", summaryRoute);
app.use("/api/recommendation", recommendationRoute);

app.listen(port, () =>
  console.log(`Server is running on server : ${port}`),
);
