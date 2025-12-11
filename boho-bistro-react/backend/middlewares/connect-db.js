import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const uri = process.env.DB_URL;
    if (!uri) {
      console.error("❌ DB_URL missing in .env");
      process.exit(1);
    }

    const dbName = process.env.DB_NAME || "BohoBistroRestaurant";

    await mongoose.connect(uri, {
      dbName: dbName,
    });

    console.log(`✅ MongoDB Connected Successfully to database: ${dbName}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};