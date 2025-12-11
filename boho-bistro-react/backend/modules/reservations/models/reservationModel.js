import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    people: { type: Number, required: true, min: 1, max: 20 },
    specialRequests: { type: String, default: "" },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", reservationSchema);