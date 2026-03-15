// import { useState, useEffect } from "react";
// import api from "../services/api";
// import socket from "../socket/socket";

// export default function StudentDashboard(){

//  const [token,setToken] = useState(null);
//  const [studentsAhead,setStudentsAhead] = useState(0);
//  const [estimatedWait,setEstimatedWait] = useState(0);
//  const [loading,setLoading] = useState(false);

//  const tokenAuth = localStorage.getItem("token");

//  const headers = {
//   Authorization:`Bearer ${tokenAuth}`
//  };

//  // generate token
//  const generateToken = async () =>{

//   try{

//    setLoading(true);

//    const res = await api.post("/token/generate",{},{
//     headers
//    });

//    fetchStatus();

//   }catch(error){

//    alert("Token generation failed");

//   }finally{
//    setLoading(false);
//   }

//  };

//  // fetch token status
//  const fetchStatus = async () =>{

//   try{

//    const res = await api.get("/token/status",{headers});

//    setToken(res.data.tokenNumber);
//    setStudentsAhead(res.data.studentsAhead);
//    setEstimatedWait(res.data.estimatedWait);

//   }catch(error){

//    console.log(error);

//   }

//  };

//  // real time updates
//  useEffect(()=>{

//   fetchStatus();

//   socket.on("queueUpdated",()=>{
//    fetchStatus();
//   });

//   return ()=>{
//    socket.off("queueUpdated");
//   }

//  },[]);

//  return(

//  <div className="dashboard-wrapper container">

//   <div className="col-md-6">

//    <div className="token-card text-center">

//     <h3 className="mb-4">
//      <i className="bi bi-people-fill icon-lg me-2"></i>
//      Smart Queue Dashboard
//     </h3>

//     {!token && (

//      <button
//       className="btn btn-warning generate-btn w-100"
//       onClick={generateToken}
//       disabled={loading}
//      >

//       <i className="bi bi-ticket-perforated me-2"></i>

//       {loading ? "Generating..." : "Generate Token"}

//      </button>

//     )}

//     {token && (

//      <>
     
//      <div className="mt-4">

//       <p>Your Token</p>

//       <div className="token-number">
//        {token}
//       </div>

//      </div>

//      <div className="row mt-4">

//       <div className="col-6">

//        <div className="info-box">

//         <i className="bi bi-people icon-lg"></i>

//         <p className="mt-2 mb-0">
//          Students Ahead
//         </p>

//         <h4>{studentsAhead}</h4>

//        </div>

//       </div>

//       <div className="col-6">

//        <div className="info-box">

//         <i className="bi bi-clock icon-lg"></i>

//         <p className="mt-2 mb-0">
//          Estimated Wait
//         </p>

//         <h4>{estimatedWait}</h4>

//        </div>

//       </div>

//      </div>

//      </>

//     )}

//    </div>

//   </div>

//  </div>

//  );

// }

import { useState, useEffect } from "react";
import api from "../services/api";
import socket from "../socket/socket";

export default function StudentDashboard(){

 const [token,setToken] = useState(null);
 const [studentsAhead,setStudentsAhead] = useState(0);
 const [estimatedWait,setEstimatedWait] = useState(0);
 const [loading,setLoading] = useState(false);

 const tokenAuth = localStorage.getItem("token");

 const headers = {
  Authorization:`Bearer ${tokenAuth}`
 };

 // generate token
 const generateToken = async () =>{

  try{

   setLoading(true);

   const res = await api.post("/token/generate",{},{
    headers
   });

   // update UI immediately
   if(res.data.token){
    setToken(res.data.token.tokenNumber);
   }

   fetchStatus();

  }catch(error){

   // if token already exists
   if(error.response && error.response.data){
    alert(error.response.data.message);
   }else{
    alert("Something went wrong");
   }

   // still fetch status to sync UI
   fetchStatus();

  }finally{
   setLoading(false);
  }

 };

 // fetch token status
 const fetchStatus = async () =>{

  try{

   const res = await api.get("/token/status",{headers});

   if(res.data.tokenNumber){
    setToken(res.data.tokenNumber);
   }

   setStudentsAhead(res.data.studentsAhead || 0);
   setEstimatedWait(res.data.estimatedWait || 0);

  }catch(error){
   console.log(error);
  }

 };

 // real time updates
 useEffect(()=>{

  fetchStatus();

  socket.on("queueUpdated",()=>{
   fetchStatus();
  });

  return ()=>{
   socket.off("queueUpdated");
  }

 },[]);

 return(

 <div className="dashboard-wrapper container">

  <div className="col-md-6 mx-auto">

   <div className="token-card text-center">

    <h3 className="mb-4">
     <i className="bi bi-people-fill icon-lg me-2"></i>
     Smart Queue Dashboard
    </h3>

    {!token && (

     <button
      className="btn btn-warning generate-btn w-100"
      onClick={generateToken}
      disabled={loading}
     >

      <i className="bi bi-ticket-perforated me-2"></i>

      {loading ? "Generating..." : "Generate Token"}

     </button>

    )}

    {token && (

     <>
     
     <div className="mt-4">

      <p>Your Token</p>

      <div className="token-number">
       {token}
      </div>

     </div>

     <div className="row mt-4">

      <div className="col-6">

       <div className="info-box">

        <i className="bi bi-people icon-lg"></i>

        <p className="mt-2 mb-0">
         Students Ahead
        </p>

        <h4>{studentsAhead}</h4>

       </div>

      </div>

      <div className="col-6">

       <div className="info-box">

        <i className="bi bi-clock icon-lg"></i>

        <p className="mt-2 mb-0">
         Estimated Wait
        </p>

        <h4>{estimatedWait}</h4>

       </div>

      </div>

     </div>

     </>

    )}

   </div>

  </div>

 </div>

 );

}