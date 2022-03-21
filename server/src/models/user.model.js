import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        email: { type: String, },
        nickname: { type: String },
        password: { type: String }
    },
    {
        timestamps: true,
        versionKey: false
    },
)

export const User = mongoose.model("user", schema)