import { v2 as cloudinary } from 'cloudinary';
// Configuration
cloudinary.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.API_Key,
    api_secret: process.env.API_Secret
});

const uploadFiles = async (filePath) => {
    if (!filePath) return

    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload(
            filePath, {
            resource_type: "auto"
        }
        )
        .catch((error) => {
            console.log(error);
        });

    console.log(uploadResult);
    return uploadResult;

};

export default uploadFiles;
