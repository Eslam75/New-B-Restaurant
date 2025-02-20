import { BookingModel } from "../../model/Bookings.js";

export const addBooking = async (req, res) => {
    try {
      const newBooking = new BookingModel(req.body);
      const savedBooking = await newBooking.save();
      res.status(201).json({ success: true, data: savedBooking });
    } catch (error) {
      console.error("Booking Error:", error);
      res.status(400).json({ message: error.message || "Something went wrong", success: false });
    }
  };
  

export const getAllBooking=async(req,res)=>{
try {
    const AllBookings=await BookingModel.find()
    res.status(200).json({success:true,data:AllBookings})
} catch (error) {
    res.status(400).json({
        message:"something is wrong",
        success:false
    })

}
}

export const deleteBooking=async(req,res)=>{
    const {id}=req.params
    console.log("idBook",id)
    const deletedBooking=await BookingModel.findByIdAndDelete(id)
    res.status(200).json({success:true,data:deletedBooking})
}

