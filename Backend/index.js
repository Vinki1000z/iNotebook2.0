const express = require("express");
const app = express();
const port = 5000;

// important Point
// Middleware to parse JSON bodies
app.use(express.json());

//  importing the db file and connecting
const connect = require("./db");
connect();
app.get("/",(req,res)=>{
    res.send("Welcome to the API");
})
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
