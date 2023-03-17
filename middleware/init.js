import morgan from "morgan";
import express from "express";
import helmet from "helmet";
import cors from "cors";

export default (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("dev"));
    app.use(helmet());
    app.use(cors());
};
