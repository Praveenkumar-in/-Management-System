
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import socket from "../socket/socket";

export default function AdminDashboard(){

 const navigate = useNavigate();

 const [queue,setQueue] = useState([]);
 const [currentToken,setCurrentToken] = useState(null);

 const adminToken = localStorage.getItem("adminToken");

 // protect page
 useEffect(()=>{

  if(!adminToken){
   navigate("/admin-login");
  }

 },[adminToken,navigate]);

 // fetch queue
 const fetchQueue = async ()=>{

  try{

   const res = await api.get("/token/queue");
   setQueue(res.data);

   if(res.data.length > 0){
    const serving = res.data.find(q=>q.status === "serving");
    if(serving){
     setCurrentToken(serving.tokenNumber);
    }
   }

  }catch(error){
   console.log(error);
  }

 };

 // call next token
 const callNext = async ()=>{

  try{

   const res = await api.post("/admin/call-next",{},{
    headers:{
     Authorization:`Bearer ${adminToken}`
    }
   });

   setCurrentToken(res.data.token.tokenNumber);

   fetchQueue();

  }catch(error){
   alert("Error calling token");
  }

 };

 // call next 10 tokens
 const callNextTen = async ()=>{

  try{

   await api.post("/admin/call-next-10",{},{
    headers:{
     Authorization:`Bearer ${adminToken}`
    }
   });

   fetchQueue();

  }catch(error){
   alert("Error");
  }

 };

 // skip token
 const skipToken = async (tokenNumber)=>{

  try{

   await api.post("/admin/skip",
    { tokenNumber },
    {
     headers:{
      Authorization:`Bearer ${adminToken}`
     }
    }
   );

   fetchQueue();

  }catch(error){
   alert("Error skipping token");
  }

 };

 // reset queue
 const resetQueue = async ()=>{

  if(!window.confirm("Reset entire queue?")) return;

  await api.post("/admin/reset",{},{
   headers:{
    Authorization:`Bearer ${adminToken}`
   }
  });

  fetchQueue();

 };

 // logout
 const logout = ()=>{

  localStorage.removeItem("adminToken");
  navigate("/admin-login");

 };

 // realtime + auto refresh
 useEffect(()=>{

  // initial load
  fetchQueue();

  // socket realtime
  socket.on("queueUpdated",()=>{
   fetchQueue();
  });

  // AUTO REFRESH EVERY 5 SECONDS
  const interval = setInterval(()=>{
   fetchQueue();
  },5000);

  // cleanup
  return ()=>{
   socket.off("queueUpdated");
   clearInterval(interval);
  }

 },[]);

 return(

 <div className="admin-panel container">

  {/* header */}

  <div className="d-flex justify-content-between align-items-center mb-4">

   <h2 className="text-white">
    <i className="bi bi-speedometer2 me-2"></i>
    Admin Queue Control
   </h2>

   <button
    className="btn btn-outline-light"
    onClick={logout}
   >
    <i className="bi bi-box-arrow-right me-2"></i>
    Logout
   </button>

  </div>

  {/* current token */}

  <div className="token-card text-center mb-4">

   <p>Currently Serving</p>

   <div className="current-token">
    {currentToken ? currentToken : "--"}
   </div>

  </div>

  {/* control buttons */}

  <div className="row mb-4">

   <div className="col-md-4">

    <button
     className="btn btn-success w-100 control-btn"
     onClick={callNext}
    >
     <i className="bi bi-play-fill me-2"></i>
     Call Next Token
    </button>

   </div>

   <div className="col-md-4">

    <button
     className="btn btn-warning w-100 control-btn"
     onClick={callNextTen}
    >
     <i className="bi bi-fast-forward-fill me-2"></i>
     Call Next 10
    </button>

   </div>

   <div className="col-md-4">

    <button
     className="btn btn-danger w-100 control-btn"
     onClick={resetQueue}
    >
     <i className="bi bi-arrow-clockwise me-2"></i>
     Reset Queue
    </button>

   </div>

  </div>

  {/* queue table */}

  <div className="queue-table p-3">

   <h4 className="mb-3">
    <i className="bi bi-list-ol me-2"></i>
    Current Queue
   </h4>

   <table className="table table-dark table-striped">

    <thead>
     <tr>
      <th>Token</th>
      <th>Status</th>
      <th>Action</th>
     </tr>
    </thead>

    <tbody>

     {queue.map((q)=>(
      <tr key={q._id}>

       <td>{q.tokenNumber}</td>
       <td>{q.status}</td>

       <td>

        {q.status === "waiting" && (

         <button
          className="btn btn-sm btn-warning"
          onClick={()=>skipToken(q.tokenNumber)}
         >
          <i className="bi bi-skip-forward-fill me-1"></i>
          Skip
         </button>

        )}

       </td>

      </tr>
     ))}

    </tbody>

   </table>

  </div>

 </div>

 );

}