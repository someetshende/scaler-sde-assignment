import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { FormControl, InputLabel, Input, Typography, styled, Button, Select, MenuItem } from "@mui/material";

const Container = styled("div")`
    width: 50%;
    margin: 5% auto 0 auto; 
    & > div {
        margin-top: 20px;
    }
`;

const FormField = styled(FormControl)`
    margin-bottom: 20px;
    width: 100%;
`;

const DateInputField = styled(Input)`
    margin-top: 10px;
`;

const AllBookings = () => {
    const prices = {"A":100, "B":80, "C":50};

    function calculateCost(startDate, endDate, roomType){
        let d1 = new Date(startDate);
        let d2 = new Date(endDate);
    
        let time_difference = d2.getTime() - d1.getTime();  
        let days_difference = time_difference / (1000 * 60 * 60 * 24);
    
        let cost = days_difference * 24 * prices[roomType];
        return cost;
    }

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [roomType, setRoomType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [price, setPrice] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const cost = calculateCost(startDate, endDate, roomType);
        alert(`The total cost for the booking is ₹${cost}`);
        try {
            await axios.post('http://localhost:8000/createBooking', {
                name: name,
                email: email,
                phone: phone,
                roomType: roomType,
                startDate: startDate,
                endDate: endDate,
            });
            navigate('/');
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Container>
            <Typography variant="h4">Manage New Booking</Typography>
            <FormField>
                <InputLabel>Name</InputLabel>
                <Input onChange={(e) => setName(e.target.value)} placeholder="name" name="Name"/>
            </FormField>
            <FormField>
                <InputLabel>Email</InputLabel>
                <Input onChange={(e) => setEmail(e.target.value)} name="Email"/>
            </FormField>
            <FormField>
                <InputLabel>Contact Number (+91)</InputLabel>
                <Input onChange={(e) => setPhone(e.target.value)} name="Contact"/>
            </FormField>
            <FormField>
                <InputLabel>Select Room Type</InputLabel>
                <Select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    displayEmpty
                    name=""
                >
                    <MenuItem value="">Select Room Type</MenuItem>
                    <MenuItem value="A">Room A</MenuItem>
                    <MenuItem value="B">Room B</MenuItem>
                    <MenuItem value="C">Room C</MenuItem>
                </Select>
            </FormField>
            <FormField>
                <InputLabel></InputLabel>
                <DateInputField 
                    type="date" 
                    name="startDate" 
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{
                        
                    }}
                />
            </FormField>
            <FormField>
                <InputLabel></InputLabel>
                <DateInputField 
                    type="date" 
                    name="endDate" 
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </FormField>
            <FormField>
                <Button variant="contained" onClick={handleSubmit}>Book</Button>
            </FormField>
        </Container>
    );
};

export default AllBookings;
