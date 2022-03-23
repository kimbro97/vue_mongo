import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        email: { type: String, required: true, unique: true },
        nickname: { type: String, required: true },
        password: { type: String, required: true },
        refreshtoken: { type: String, default: null }
    },
    {
        timestamps: true,
        versionKey: false
    },
)

export const User = mongoose.model("user", schema)