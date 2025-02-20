import { OrderModel } from "../../model/order.js";

export const createOrder = async (req, res) => {
    try {
    const userId=req.userId
      const { name, address, phone, cartItems } = req.body;
      if (!name || !address || !phone || cartItems.length === 0) {
        return res.status(400).json({ message: "جميع الحقول مطلوبة!" });
      }
  
      const newOrder = new OrderModel({
        userId,
        name,
        address,
        phone,
        items: cartItems,
      });
  
      await newOrder.save();
      res.status(201).json({ success:true, message: "تم اضافة الطلب بنجاح" });
    } catch (error) {
      res.status(500).json({ message: "خطأ في السيرفر" });
    }
  }

  export const getAllOrders=async(req,res)=>{
    try {
        const orders = await OrderModel.find().populate("items.productId");
        res.status(200).json({success:true,data:orders})
    } catch (error) {
      res.status(400).json({
          message:"something is wrong",
          success:false
      })
  
    }
  }


  export const getMyOrders=async(req,res)=>{
    try {
        const orders = await OrderModel.find({userId:req.userId}).populate("items.productId");
        res.status(200).json({success:true,data:orders})
    } catch (error) {
      res.status(400).json({
          message:"something is wrong",
          success:false
      })
    }
  }


  export const deleteAllOrders=async(req,res)=>{
    try {
        const orders = await OrderModel.deleteMany({});
        res.status(200).json({success:true,data:orders})
    } catch (error) {
      res.status(400).json({
          message:"something is wrong",
          success:false
      })
    }
  }




 export const deleteOrder=async(req,res)=>{
    try {
        const orders = await OrderModel.findByIdAndDelete(req.params.id);
        res.status(200).json({success:true,message:"order deleted"})
    } catch (error) {
      res.status(400).json({
          message:"something is wrong",
          success:false
      })
    }
 }

// تحديث حالة الطلب
export const updatedOrder = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body; 

  try {
    const validStatuses = ["Pending", "Processing", "Shipped", "Delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "حالة غير صالحة" });
    }

    // تحديث الطلب في قاعدة البيانات
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "الطلب غير موجود" });
    }

    res.json({ success: true, message: "تم تحديث حالة الطلب", data: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "حدث خطأ في السيرفر" });
  }
};

