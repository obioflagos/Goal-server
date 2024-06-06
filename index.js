require("dotenv").config();
const express =require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const goalRoutes =  require("./router/goalRouter");

//MIDDLE ware 
app.use(express.json());
app.use(cors());

//router
app.use("/api/v1/goals", goalRoutes);

//error route
app.use((req,res) =>{
    res.status(404).json({message: "Route not found"});

})

//db connection 
const startServer = async () => {
    try{
        await mongoose.connect(process.env.mongo_url, {dbName: "testgoalserver"});
        app.listen(PORT, () =>{
            console.log(`server running on port: ${PORT}`);
        });
    }catch (error) {
        console.log(error);
    }
};
startServer();