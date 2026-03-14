const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const tokenRoutes = require("./routes/tokenRoutes");
const adminRoutes = require("./routes/adminRoutes");

const { initSocket } = require("./socket/socket");

dotenv.config();

const app = express();

// create HTTP server
const server = http.createServer(app);

// initialize socket server
initSocket(server);

app.use(cors());
app.use(express.json());

// connect MongoDB
connectDB();

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/token", tokenRoutes);
app.use("/api/admin", adminRoutes);

// test route
app.get("/", (req,res)=>{
 res.send("Smart Queue API Running");
});

const PORT = process.env.PORT || 5000;

// start server
server.listen(PORT,()=>{
 console.log(`Server running on port ${PORT}`);
});