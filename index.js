import express from "express";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;
const token = process.env.TOKEN;
const baseUrl = process.env.BASE_URL;

app.get("/", (req, res) => {
  console.log(port, token, baseUrl);
  res.send("I am a backend server");
});

app.get("/api", async (req, res) => {
  try {
    console.log(`${baseUrl}/test/even`);
    const response = await axios(`${baseUrl}even`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);

    // res.send(response.data);
  } catch (error) {
    console.log("error",error);
  }
  
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
