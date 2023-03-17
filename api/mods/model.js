import mongoose from "mongoose";

const modSchema = new mongoose.Schema({
    link: {
        type: String,
    },
});

export default mongoose.model("Mod", modSchema);
