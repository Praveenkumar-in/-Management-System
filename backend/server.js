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

/* ---------------- HTTP Server ---------------- */

const server = http.createServer(app);

/* ---------------- Socket Server ---------------- */

initSocket(server);

/* ---------------- Middleware ---------------- */

app.use(
 cors({
  origin: "*", // change to your Vercel URL later
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
 })
);

app.use(express.json());

/* ---------------- Database ---------------- */

connectDB();

/* ---------------- Routes ---------------- */

app.use("/api/auth", authRoutes);
app.use("/api/token", tokenRoutes);
app.use("/api/admin", adminRoutes);

/* ---------------- Test Route ---------------- */

app.get("/", (req,res)=>{
 res.send("Smart Queue API Running 🚀");
});

/* ---------------- Server ---------------- */

const PORT = process.env.PORT || 5000;

server.listen(PORT,()=>{
 console.log(`Server running on port ${PORT}`);
});