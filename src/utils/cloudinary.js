import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
// Configuration
cloudinary.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.API_Key,
    api_secret: process.env.API_Secret
});

const uploadFile = async (filePath) => {
    if (!filePath) return

    // upload file
    try {
        const uploadResult = await cloudinary.uploader.upload(
            filePath,
            {
                resource_type: "auto"
            })

        console.log(uploadResult);
        return uploadResult;

    } catch (error) {
        console.error(error);
        fs.unlinkSync(filePath);
    }

};

export { uploadFile };
