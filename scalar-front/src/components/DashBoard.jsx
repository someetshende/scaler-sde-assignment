import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableCell, TableRow, styled, Button, TextField, MenuItem, FormControl, InputLabel, Select, Box } from '@mui/material';
import { getBookings, deleteUser } from "../service/api";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const StyledTable = styled(Table)`
    width: 90%;
    margin: 50px 0 0 50px;
`;

const THead = styled(TableHead)`
    & > th {
        font-size: 20px;
        background: #111111;
        color: #FFFFFF;
    }
`;

const TRow = styled(TableRow)`
    & > td{
        font-size: 18px
    }
`;

const FilterContainer = styled(Box)`
    display: flex;
    align-items: center;
    gap: 40px;
    margin: 50px 0 0 50px;
`;

const RoomTypeFormControl = styled(FormControl)`
    width: 120px; /* Adjust width as needed */
    padding: 8px; /* Add padding for better appearance */
`;

const DashBoard = () => {
    const [bookings , setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [filters, setFilters] = useState({
        roomType: '',
        startTime: '',
        endTime: ''
    });

    useEffect(() => {
        axios.get("https://scaler-sde-assignment-ivory.vercel.app/allBookings")
            .then((res) => {
                setBookings(res.data);
                setFilteredBookings(res.data); 
            }) 
    }, []);

    const navigate = useNavigate();

    const deleteBooking = async (id, startDate, costOfBooking) => {
        const refund = calculateRefund(startDate, costOfBooking);
        const confirmation = window.confirm(`Are you sure you want to delete? Refund amount: $${refund}`);
        if (confirmation) {
            await deleteUser(id);
            // Update bookings list after deletion
            setBookings(bookings.filter(booking => booking._id !== id));
            setFilteredBookings(filteredBookings.filter(booking => booking._id !== id));
        } else {
            navigate('/');
        }
    }

    function calculateRefund(startDate, costOfBooking){
        const currentDate = new Date();
        const bookingDate = new Date(startDate);
        const timeBetween = (currentDate.getTime() - bookingDate.getTime()) / (1000 * 60 * 60);
        if(timeBetween <= 0) {
            return costOfBooking; 
        } else if(timeBetween > 48){
            return costOfBooking; 
        } else if(timeBetween >= 24 && timeBetween <= 48){
            return costOfBooking / 2;
        }
        return 0; 
    }

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
    };

    const applyFilters = () => {
        let filteredList = bookings;
        if (filters.roomType) {
            filteredList = filteredList.filter(booking => booking.roomType === filters.roomType);
        }
        if (filters.startTime) {
            filteredList = filteredList.filter(booking => new Date(booking.startTime) >= new Date(filters.startTime));
        }
        if (filters.endTime) {
            filteredList = filteredList.filter(booking => new Date(booking.endTime) <= new Date(filters.endTime));
        }
        setFilteredBookings(filteredList);
    };

    return (
        <div>
            <FilterContainer>
                <RoomTypeFormControl>
                    <InputLabel>Room Type</InputLabel>
                    <Select
                        value={filters.roomType}
                        onChange={handleFilterChange}
                        name="roomType"
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="A">A</MenuItem>
                        <MenuItem value="B">B</MenuItem>
                        <MenuItem value="C">C</MenuItem>
                    </Select>
                </RoomTypeFormControl>

                <TextField
                    label="Start Time"
                    type="datetime-local"
                    value={filters.startTime}
                    onChange={handleFilterChange}
                    name="startTime"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    label="End Time"
                    type="datetime-local"
                    value={filters.endTime}
                    onChange={handleFilterChange}
                    name="endTime"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <Button variant="contained" onClick={applyFilters}>Apply Filters</Button>
            </FilterContainer>

            <StyledTable>
                <THead>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone(+91)</TableCell>
                    <TableCell>Room Type</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                </THead>
                <TableBody>
                    {filteredBookings.map(element => (
                        <SingleItem 
                            key={element._id} 
                            element={element} 
                            deleteBooking={deleteBooking} 
                        />
                    ))}
                </TableBody>
            </StyledTable>
        </div>
    )
}

const SingleItem = ({element, deleteBooking})=>{
    const navigate = useNavigate();

    return (
        <TableRow>
            <TableCell>{element.name}</TableCell>
            <TableCell>{element.email}</TableCell>
            <TableCell>{element.phone}</TableCell>
            <TableCell>{element.roomType}</TableCell>
            <TableCell>{element.startDate}</TableCell>
            <TableCell>{element.endDate}</TableCell>
            <TableCell>
                <Button variant="contained" onClick={() => navigate(`/edit/${element._id}`)}>Edit</Button>
            </TableCell>
            <TableCell>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => deleteBooking(element._id, element.startDate, element.costOfBooking)}
                >
                    Delete
                </Button>
            </TableCell> 
        </TableRow>
    )
}

export default DashBoard;
