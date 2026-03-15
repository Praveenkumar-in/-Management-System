// import { useState } from "react";
// import api from "../services/api";

// export default function AdminLogin(){

//  const [username,setUsername] = useState("");
//  const [password,setPassword] = useState("");

//  const handleLogin = async (e)=>{

//   e.preventDefault();

//   try{

//    const res = await api.post("/auth/login-admin",{
//     username,
//     password
//    });

//    localStorage.setItem("adminToken",res.data.token);

//    window.location.href="/admin-dashboard";

//   }catch(error){

//    alert("Invalid Admin Credentials");

//   }

//  };

//  return(

//  <div className="container d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>

//   <div className="col-md-4">

//    <div className="glass-card p-4">

//     <h2 className="text-center page-title mb-4">

//      <i className="bi bi-shield-lock-fill me-2"></i>
//      Admin Login

//     </h2>

//     <form onSubmit={handleLogin}>

//      <div className="mb-3">

//       <label className="form-label">
//        <i className="bi bi-person"></i> Username
//       </label>

//       <input
//        type="text"
//        className="form-control"
//        placeholder="Enter Admin Username"
//        value={username}
//        onChange={(e)=>setUsername(e.target.value)}
//       />

//      </div>

//      <div className="mb-3">

//       <label className="form-label">
//        <i className="bi bi-lock"></i> Password
//       </label>

//       <input
//        type="password"
//        className="form-control"
//        placeholder="Enter Password"
//        value={password}
//        onChange={(e)=>setPassword(e.target.value)}
//       />

//      </div>

//      <button className="btn btn-danger btn-modern w-100">

//       <i className="bi bi-box-arrow-in-right me-2"></i>
//       Login

//      </button>

//     </form>

//     <p className="text-center mt-3">

//      Student?  
//      <a href="/" className="text-warning ms-1">
//       Go to Student Login
//      </a>

//     </p>

//    </div>

//   </div>

//  </div>

//  );

// }

import { useState } from "react";
import api from "../services/api";

export default function AdminLogin(){

 const [username,setUsername] = useState("");
 const [password,setPassword] = useState("");

 const handleLogin = async (e)=>{

  e.preventDefault();

  // validation
  if(!username.trim() || !password.trim()){
   alert("Username and Password are required");
   return;
  }

  try{

   const res = await api.post("/auth/login-admin",{
    username,
    password
   });

   // save token
   localStorage.setItem("adminToken",res.data.token);

   // redirect
   window.location.href="/admin-dashboard";

  }catch(error){

   alert("Invalid Admin Credentials");

  }

 };

 return(

 <div className="container d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>

  <div className="col-md-4">

   <div className="glass-card p-4">

    <h2 className="text-center page-title mb-4">

     <i className="bi bi-shield-lock-fill me-2"></i>
     Admin Login

    </h2>

    <form onSubmit={handleLogin}>

     <div className="mb-3">

      <label className="form-label">
       <i className="bi bi-person"></i> Username
      </label>

      <input
       type="text"
       className="form-control"
       placeholder="Enter Admin Username"
       value={username}
       onChange={(e)=>setUsername(e.target.value)}
       required
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
       required
      />

     </div>

     <button type="submit" className="btn btn-danger btn-modern w-100">

      <i className="bi bi-box-arrow-in-right me-2"></i>
      Login

     </button>

    </form>

    <p className="text-center mt-3">

     Student?  
     <a href="/" className="text-warning ms-1">
      Go to Student Login
     </a>

    </p>

   </div>

  </div>

 </div>

 );

}