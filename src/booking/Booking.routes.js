import express from 'express';
import { addBooking, getAllBooking,deleteBooking } from './Booking.controller.js';

export const bookingRouter = express.Router();

// 
bookingRouter.post("/addBooking",addBooking)
bookingRouter.get("/getAllBooking",getAllBooking)
bookingRouter.delete("/deleteBooking/:id",deleteBooking)
// 