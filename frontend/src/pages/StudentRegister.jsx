import { useState } from "react";
import api from "../services/api";

export default function StudentRegister(){

 const [name,setName]=useState("");
 const [registerNumber,setRegisterNumber]=useState("");
 const [phoneNumber,setPhoneNumber]=useState("");
 const [password,setPassword]=useState("");

 const handleRegister = async(e)=>{

  e.preventDefault();

  try{

   await api.post("/auth/register",{
    name,
    registerNumber,
    phoneNumber,
    password
   });

   alert("Account Created Successfully");

   window.location.href="/";

  }catch(error){
   alert("Registration Failed");
  }

 };

 return(

 <div className="container d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>

  <div className="col-md-5">

   <div className="glass-card p-4">

    <h2 className="text-center page-title mb-4">
     <i className="bi bi-person-plus"></i> Student Register
    </h2>

    <form onSubmit={handleRegister}>

     <div className="mb-3">

      <label className="form-label">
       <i className="bi bi-person"></i> Full Name
      </label>

      <input
       type="text"
       className="form-control"
       placeholder="Enter Full Name"
       value={name}
       onChange={(e)=>setName(e.target.value)}
      />

     </div>

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
       <i className="bi bi-telephone"></i> Phone Number
      </label>

      <input
       type="text"
       className="form-control"
       placeholder="Enter Phone Number"
       value={phoneNumber}
       onChange={(e)=>setPhoneNumber(e.target.value)}
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

     <button className="btn btn-success btn-modern w-100">
      <i className="bi bi-check-circle"></i> Create Account
     </button>

    </form>

    <p className="text-center mt-3">

     Already have account?  
     <a href="/" className="text-warning ms-1">
      Login
     </a>

    </p>

   </div>

  </div>

 </div>

 );

}