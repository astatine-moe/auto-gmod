import { Strategy as DiscordStrategy } from "passport-discord";
import User from "../api/users/model.js";

const scopes = ["identify", "email", "guilds"];

export default (passport) => {
    passport.use(
        new DiscordStrategy(
            {
                clientID: process.env.DISCORD_CLIENT_ID,
                clientSecret: process.env.DISCORD_CLIENT_SECRET,
                callbackURL: process.env.DISCORD_CALLBACK_URL,
                scope: scopes,
            },
            (accessToken, refreshToken, profile, done) => {
                //first of all, let's fetch a list of all the guilds the user is in
                //we'll use this to check if they're in the server

                let guilds = profile.guilds.map((guild) => guild.id);

                if (!guilds.includes(process.env.DISCORD_GUILD_ID)) {
                    return done(null, false, {
                        message: "You're not in the server!",
                    });
                }

                // if user is not in the database, add them
                User.findOne({ discord_id: profile.id })
                    .then((user) => {
                        if (!user) {
                            const newUser = new User({
                                discord_id: profile.id,
                                username: profile.username,
                                discriminator: profile.discriminator,
                                avatar: profile.avatar,
                                is_allowed: true,
                            });

                            newUser
                                .save()
                                .then((user) => {
                                    done(null, user);
                                })
                                .catch((err) => {
                                    done(err, null);
                                });
                        } else {
                            done(null, user);
                        }
                    })
                    .catch((err) => {
                        done(err, null);
                    });
            }
        )
    );

    passport.serializeUser((user, done) => {
        console.log("Serialized");
        done(null, user);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then((user) => {
                console.log("Deserialized");
                done(null, user);
            })
            .catch((err) => {
                done(err, null);
            });
    });
};
