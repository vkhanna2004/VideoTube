import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();


// urlencoded- extended:true for giving nested objects
// .static - tells Express to serve static files from the public directory.such as images,favicons,etc

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" })); //limited the json file size
app.use(
  express.urlencoded({
    extended: true,
    limit: "72kb",
  })
);
app.use(express.static("public"));
app.use(cookieParser());

//importing routes
import userRouter from "./routes/user.routes.js"


//declaring routes
app.use("/api/v1/users",userRouter)

export { app };

