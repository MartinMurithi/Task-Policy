import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import mongoose from "mongoose";

import connect from "./config/db_connect";
import "./config/db_connect";
import clientRoute from "./routes/clientRoute";

const app = express();
const port = process.env.PORT || 9090;

// Connect to db
connect();

app.use(express.json());
app.use(
    cors({
        credentials: true
    })
);
app.use(cookieParser());
app.use(compression());

app.use("/", clientRoute);

// Listen to open event on the mongoose connection
mongoose.connection.once("open", () => {
    app.listen(port, () => {
    console.log("This server is listening on port", port);
});
});


