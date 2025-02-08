import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters long"],
        maxlength: [12, "Password cannot exceed 12 characters"],
    },
    refreshToken: {
        type: String
    },
    avatar: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        default: "defaultCoverImageUrl", // Optional default URL
    },
    watchHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }],
}, { timestamps: true });

// encrypt password
userSchema.pre("save", async function (next) {
    if (this.isModified("password"))
        this.password = await bcrypt.hash(this.password, 10);
    next();
});

// compare password
userSchema.methods.comparePassword = async function (password) {
    const isCorrect = await bcrypt.compare(password, this.password);
    return isCorrect;
};

// generate access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { _id: this._id, userName: this.userName, email: this.email },
        process.env.ACCESS_TOKEN,
        { expiresIn: "1d" }
    );
};

// generate refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.ACCESS_TOKEN,
        { expiresIn: "1d" }
    );
};

export const User = mongoose.model("User", userSchema);
