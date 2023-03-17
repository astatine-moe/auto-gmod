import express from "express";
import http from "http";
import mongoose from "mongoose";
import init from "./middleware/init.js";
import session from "./middleware/session.js";
import listEndpoints from "express-list-endpoints";
import dotenv from "dotenv";
import auth from "./api/users/auth.js";
dotenv.config();

const app = express();
init(app);

mongoose.connect(process.env.MONGO_URI).then(() => {
    session(app);
    //routes
    app.use("/auth", auth);
    app.get("/", (req, res) => {
        if (req.isAuthenticated()) {
            res.send(req.user);
        } else {
            res.send("Not Authenticated");
        }
    });
    //error handlers

    http.createServer(app).listen(process.env.PORT, () => {
        console.log(
            `Server is running on port http://127.0.0.1:${process.env.PORT}`
        );
        console.log(listEndpoints(app));
    });
});
