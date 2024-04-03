import express, {Router, response} from 'express';
import {addBookings, getDetails, deleteUser} from '../controller/user-controller.js'
// import { getBookings, getDetails } from '../../scalar-front/src/service/api.js';


const router = express.Router();

// router.post('/allBookings', addBookings)

// router.post('/',getBookings)

router.get('/:id',getDetails);

router.delete('/delete/:id',deleteUser);

export default router;