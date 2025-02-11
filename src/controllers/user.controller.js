import { User } from "../models/user.model.js";
import { throwApiError } from "../utils/ApiError.js";
import { uploadFile } from "../utils/cloudinary.js";

const registerUser = async (req, res) => {

    const { userName, fullName, email, password } = req.body;
    if ([userName, fullName, email, password].some((value) => value?.trim() === "")) {
        // sent error to user
        throwApiError(400, "All fields are required");
    }

    const existedUser = User.findOne({ $or: [{ userName }, { email }] });
    if (existedUser) {
        if (existedUser.userName === userName) {
            throwApiError(409, "User name already exists");
        }
        if (existedUser.email === email) {
            throwApiError(409, "Email already exists");
        }
    }

    console.log(req.files);
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.avatar[0]?.path;

    if (!avatarLocalPath) {
        throwApiError(400, "Avatar is required");
    }

    const avatar = await uploadFile(avatarLocalPath);
    const coverImage = await uploadFile(coverImageLocalPath);

    if (!avatar) {
        throwApiError(400, "Avatar is required");
    }

    const user = await User.create({ userName, email, password, fullName, avatar: avatar.url, coverImage: coverImage?.url || "" });
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throwApiError(500, "Failed to register. Please try again later.");
    }
}
export { registerUser }