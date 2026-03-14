import { BrowserRouter, Routes, Route } from "react-router-dom";

import StudentLogin from "./pages/StudentLogin";
import StudentRegister from "./pages/StudentRegister";
 import StudentDashboard from "./pages/StudentDashboard";
 import AdminLogin from "./pages/AdminLogin";
 import AdminDashboard from "./pages/AdminDashboard";
 import DisplayBoard from "./pages/DisplayBoard";

import Navbar from "./components/Navbar";
function App() {

 return (
  <BrowserRouter>

  <Navbar/>
   <Routes>

    <Route path="/" element={<StudentLogin />} />
     <Route path="/register" element={<StudentRegister />} />
     <Route path="/student-dashboard" element={<StudentDashboard />} />

     <Route path="/admin-login" element={<AdminLogin />} /> 

    <Route path="/admin-dashboard" element={<AdminDashboard />} />

    <Route path="/display" element={<DisplayBoard />} />  

   </Routes>

  </BrowserRouter>
 );
}

export default App;