import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import passportInit from "./passport.js";

export default (app) => {
    let sessionObj = {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 90, // 90 days
        },
    };

    if (process.env.NODE_ENV === "production") {
        app.set("trust proxy", 1);
        sessionObj.cookie.secure = true;
        sessionObj.cookie.domain = process.env.DOMAIN;
    }

    sessionObj.store = MongoStore.create({
        client: mongoose.connection.getClient(),
        dbName: process.env.DB_NAME,
        collectionName: "sessions",
    });

    app.use(session(sessionObj));
    passportInit(passport);
    app.use(passport.initialize());
    app.use(passport.session());
};
