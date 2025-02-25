import cookieParser from 'cookie-parser';
import express from 'express';
import cors from "cors";
import { dbconnection } from './dbconnection/dbconnection.js';
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import userRouter from './src/user/user.routes.js';
import { bookingRouter } from './src/booking/Booking.routes.js';
import productRouter from './src/products/products.routes.js';
import cartRouter from './src/Cart/cart.routes.js';
import { wishRouter } from './src/wishList/wishList.routes.js';
import bookTable from './src/BookTable/bookTable.routes.js';
import orderRouter from './src/Order/order.routes.js';
import path from 'path';
import compression from 'compression';

dotenv.config();
const __dirname = path.resolve();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

global.io = io;
const onlineUsers = new Map();

// اتصال قاعدة البيانات
await dbconnection();

// Middleware
app.use(compression());
app.use(cookieParser());
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use("/images", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// تحديد المسار الصحيح لملف React build
const frontendPath = path.join(__dirname, "FE", "build");
app.use(express.static(frontendPath));

// استخدام الروترات
app.use(orderRouter);
app.use(bookTable);
app.use(userRouter);
app.use(productRouter);
app.use(bookingRouter);
app.use(cartRouter);
app.use(wishRouter);

// هندلر الأخطاء
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error(`Error: ${message}, Status Code: ${statusCode}`);
    
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
});

// التعامل مع أي طلب غير معرف وإرساله إلى React
app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// إعداد WebSocket
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    
    socket.on("join", (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined room`);
    });
    
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// تشغيل السيرفر
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`)
);
