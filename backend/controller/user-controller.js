




export const addBookings = (request,response) =>{
    const data = request.body;
    console.log(data);
}

export const getDetails = async(request,response) =>{
    console.log(request.params.id);
    try{
        const users = await Bookings.findById(request.params.id);
        response.status(200).json(Bookings);
    }
    catch(error){
        response.status(404).json({message: error.message});
    }
}

export const deleteUser = async(request,response) =>{
    try{
        await Bookings.findByIdAndDelete({_id:request.params.id});
    }
    catch(error){
        response.status(404).json({message: error.message});
    }
}

