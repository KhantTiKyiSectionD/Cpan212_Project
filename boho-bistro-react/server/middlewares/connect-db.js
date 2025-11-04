import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error("❌ MONGO_URI missing in .env");
      process.exit(1);
    }

    await mongoose.connect(uri, {
      dbName: "BohoBistroRestaurant", 
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export async function connectDB(req, res, next) {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "BohoBistroRestaurant" });
    console.log("Database Connected");
    next();
  } catch (error) {
    console.log("Database connection failed");
    console.log(error);
  }
}
