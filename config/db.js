import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        const connection = await mongoose.connect(
            process.env.MONGO_URI,
            {
                useNewUrlParser : true,
                useUnifiedTopology : true
            }
        );

    }catch (e) {
        console.log(`error: ${e.message}`);
        process.exit(1);
    }
}

export default conectarDB;