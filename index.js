import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express()


const port = process.env.PORT || 3000;
const token = process.env.TOKEN;




app.get('/', (req, res) => {
    console.log(port, token, baseUrl)
  res.send("I am a backend server")
})

app.listen(port, () => {
    console.log("Server is running on port 3000")
})