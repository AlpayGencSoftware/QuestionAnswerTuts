const express= require("express");
const dotenv=require("dotenv");
const connectDatabase=require("./helpers/database/connectDatabase");
const routers=require("./routers/index");
const customErrorHandler= require("./middlewares/errors/customErrorHandler");
const path= require("path");

//Envoriment Variables
dotenv.config({
    path:"./config/env/config.env"
});

// MongoDB Connection  

connectDatabase(); 

const app= express();

// Express Body Middleware

app.use(express.json());
 
// localhost:5000/api/questions
// localhost:5000/api/auth

const PORT= process.env.PORT;

// Routers Middleware
app.use("/api",routers);
 
// Error Handler
app.use(customErrorHandler);

//Static Files
app.use(express.static(path.join(__dirname, "public")));

// Error Handler
app.listen(PORT,()=>{
    console.log(`App Started on {PORT}: ${process.env.PORT}`);
});