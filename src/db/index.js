import 'dotenv/config'
import mongoose from 'mongoose';
const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.DB_URL}/test`);
    } catch (error) {
        console.error("DB Connection Failed: ", error);
    }
};
export default connectDB;