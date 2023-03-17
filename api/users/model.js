import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    discord_id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    discriminator: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    is_allowed: {
        type: Boolean,
        default: false,
    },

    mods: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mod",
        },
    ],
});

export default mongoose.model("User", userSchema);
