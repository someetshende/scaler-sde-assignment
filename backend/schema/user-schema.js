import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    roomtype: String,
    startDate: String,
    endDate: String,
});

const Bookings = mongoose.model('Bookings', BookingSchema);

export default Bookings;