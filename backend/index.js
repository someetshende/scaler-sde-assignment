import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {deleteUser} from './controller/user-controller.js'

const app = express();
const PORT = 8000;

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

mongoose.connect("mongodb+srv://shendesomeet95:GOyXYTHanmPIPSjX@cluster0.6qjgbye.mongodb.net/HotelManagementSystem");

const BookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    roomType: String,
    startDate: String,
    endDate: String,
});

const Bookings = mongoose.model('Bookings', BookingSchema);

app.get('/', async (req, res)=>{
    try {
        const bookings = await Bookings.find();
        return res.status(200).send(bookings);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error fetching bookings");
    }
});

app.post('/createBooking', async (req, res)=>{
    const {name, email, phone, roomType, startDate, endDate} = req.body;
    const data = new Bookings({
        name, 
        email,
        phone,
        roomType,
        startDate,
        endDate 
    });
    
    try {
        const saved = await data.save();
        console.log(saved);
        return res.status(201).json(saved);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error creating booking");
    }
});

app.get('/allBookings', async (req, res) =>{
    try{
        const allData = await Bookings.find();
        res.status(200).json(allData);
    }
    catch(error){
        res.status(404).json("Error");
    }
});

app.post('/edit/:id', async (req, res)=>{
    const id = req.params.id;
    const {name,email,phone,roomType,startDate,endDate} = req.body;
    console.log(id);
    const user = await Bookings.findByIdAndUpdate(id, {
        name: name,
        email: email,
        phone: phone,
        roomType: roomType,
        startDate: startDate,
        endDate: endDate,
    });
    // console.log(user)
    res.status(201).json(user);
})

app.delete('/delete/:id', async (req, res)=>{
    const id= req.params.id;
    await  Bookings.findByIdAndDelete(id);
    return res.status(203).send("Deleted")
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
