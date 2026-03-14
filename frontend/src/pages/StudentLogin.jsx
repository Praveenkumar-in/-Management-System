import { useState } from "react";
import api from "../services/api";

export default function StudentLogin(){

 const [registerNumber,setRegisterNumber]=useState("");
 const [password,setPassword]=useState("");

 const handleLogin = async (e)=>{

  e.preventDefault();

  try{

   const res = await api.post("/auth/login-student",{
    registerNumber,
    password
   });

   localStorage.setItem("token",res.data.token);

   window.location.href="/student-dashboard";

  }catch(error){
   alert("Login Failed");
  }

 };

 return(

 <div className="container d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>

  <div className="col-md-4">

   <div className="glass-card p-4">

    <h2 className="text-center page-title mb-4">
     <i className="bi bi-person-circle me-2"></i>
     Student Login
    </h2>

    <form onSubmit={handleLogin}>

     <div className="mb-3">

      <label className="form-label">
       <i className="bi bi-person-badge"></i> Register Number
      </label>

      <input
       type="text"
       className="form-control"
       placeholder="Enter Register Number"
       value={registerNumber}
       onChange={(e)=>setRegisterNumber(e.target.value)}
      />

     </div>

     <div className="mb-3">

      <label className="form-label">
       <i className="bi bi-lock"></i> Password
      </label>

      <input
       type="password"
       className="form-control"
       placeholder="Enter Password"
       value={password}
       onChange={(e)=>setPassword(e.target.value)}
      />

     </div>

     <button className="btn btn-primary btn-modern w-100">
      <i className="bi bi-box-arrow-in-right"></i> Login
     </button>

    </form>

    <p className="text-center mt-3">

     Don't have account?  
     <a href="/register" className="text-warning ms-1">
      Register
     </a>

    </p>

   </div>

  </div>

 </div>

 );

}