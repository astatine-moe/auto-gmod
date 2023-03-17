import express from "express";
const router = express.Router();
import passport from "passport";

router.get(
    "/",
    passport.authenticate("discord", {
        scope: ["identify", "email", "guilds"],
    })
);

router.get(
    "/callback",
    passport.authenticate("discord", {
        failureRedirect: process.env.DOMAIN + "/access-denied",
    }),
    (req, res) => {
        res.redirect("/");
    }
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

export default router;
