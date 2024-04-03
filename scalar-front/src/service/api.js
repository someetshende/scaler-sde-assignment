import axios from 'axios';



const URL = 'http://localhost:8000';

export const addBooking= async(data) =>{
    try{
        return await axios.post(`${URL}/createBooking`, data);
    }
    catch(error){
        console.log("Error while calling addBooking API ",error);
    }
}

export const getBookings = async() =>{
    try{
        return await axios.get(`${URL}/`) 
    }
    catch(error){
        console.log("Error While Calling getBookings Request ",error);
    }
}

export const getDetails = async(id) =>{
    // console.log(id);
    try{
        return await axios.get(`${URL}/${id}`);
    }
    catch(error){
        console.log(error);
    }
}

export const deleteUser = async(id) =>{
    try{
        return axios.delete(`${URL}/delete/${id}`);
    }
    catch(error){
        console.log(error);
    }
}