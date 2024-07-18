import express from "express";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;
const token = process.env.TOKEN;
const baseUrl = process.env.BASE_URL;

const numberEndpoint = {
  e: `even`,
  p: `primes`,
  f: `fibo`,
  r: `rand`,
};

app.get("/", (req, res) => {
  console.log(port, token, baseUrl);
  res.send("I am a backend server");
});

app.get("/numbers/:numberId", async (req, res) => {
  const numberId = req.params.numberId;
  console.log(numberId);
  if (!numberEndpoint[numberId]) {
    res.send("Invalid numberId");
    return;
  }
  try {
    const response = await axios.get(`${baseUrl}${numberEndpoint[numberId]}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.send({ number_id: response.data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: "Failed to fetch data" });
  }
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
