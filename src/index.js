// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
dotenv.config({ 
  path: "./.env" 
});

import connectDB from "./db/index.js";
import {app} from "./app.js";



connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR :: generated by line 14 in src/index.js ::", error);
      // throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGO db connection failed !!! ", error);
  });

/*
//method 1 for connecting to DB

import mongoose from "mongoose"
import { DB_NAME } from "./constants.js";

//iife
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERROR :: ", error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("ERROR :: Connection Failed :: ", error);
    throw error;
  }
})();
*/
