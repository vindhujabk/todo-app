import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import userRouter from "./routes/userRoute.js"
import projectRouter from "./routes/projectRoute.js"

//app config
dotenv.config()
const app = express()
const port = process.env.PORT || 8001
mongoose.set('strictQuery', true);

//middlewares
app.use(express.json())
app.use(cors());

//db config
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log("Connected to database");
});
mongoose.connection.on('error', (error) => {
    console.error("Error connecting to database: ", error);
});


//api endpoints
app.use("/api/user", userRouter)
app.use("/api/project", projectRouter)

app.get("/", (req, res) => {
    res.json({ message: "Todo App is running" });
  });

//listen
app.listen(port, () => console.log(`Listening on localhost:${port}`))