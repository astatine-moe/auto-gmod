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
        failureRedirect: "/",
    }),
    (req, res) => {
        if (!req.isAuthenticated())
            return res.redirect(`${process.env.DOMAIN}/denied`);
        res.redirect(`${process.env.DOMAIN}/`);
    }
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

export default router;
