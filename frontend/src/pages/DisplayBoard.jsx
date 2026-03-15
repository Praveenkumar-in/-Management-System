// import { useEffect,useState } from "react";
// import api from "../services/api";
// import socket from "../socket/socket";

// export default function DisplayBoard(){

//  const [currentToken,setCurrentToken] = useState(null);
//  const [nextTokens,setNextTokens] = useState([]);

//  const fetchQueue = async ()=>{

//   try{

//    const res = await api.get("/token/queue");

//    const queue = res.data;

//    if(queue.length > 0){

//     setCurrentToken(queue[0].tokenNumber);

//     setNextTokens(queue.slice(1,6));

//    }

//   }catch(error){
//    console.log(error);
//   }

//  };

//  useEffect(()=>{

//   fetchQueue();

//   socket.on("queueUpdated",()=>{
//    fetchQueue();
//   });

//   return ()=>{
//    socket.off("queueUpdated");
//   }

//  },[]);

//  return(

//  <div className="display-board">

//   <h1 className="mb-4">

//    <i className="bi bi-ticket-perforated me-2"></i>
//    Fee Payment Queue

//   </h1>

//   {/* current token */}

//   <div>

//    <p>NOW SERVING</p>

//    <div className="current-display">

//     {currentToken ? currentToken : "--"}

//    </div>

//   </div>

//   {/* next tokens */}

//   <div className="next-tokens">

//    {nextTokens.map((token)=>(
//     <div
//      key={token._id}
//      className="next-token-box"
//     >
//      {token.tokenNumber}
//     </div>
//    ))}

//   </div>

//   {/* counter */}

//   <div className="counter-box">

//    <i className="bi bi-bank2 me-2"></i>
//    Counter 1

//   </div>

//  </div>

//  );

// }


//
import { useEffect, useState } from "react";
import api from "../services/api";
import socket from "../socket/socket";

export default function DisplayBoard(){

 const [currentToken,setCurrentToken] = useState(null);
 const [nextTokens,setNextTokens] = useState([]);

 const fetchQueue = async () => {

  try{

   const res = await api.get("/token/queue");
   const queue = res.data;

   if(queue && queue.length > 0){

    setCurrentToken(queue[0].tokenNumber);
    setNextTokens(queue.slice(1,6));

   }else{

    setCurrentToken(null);
    setNextTokens([]);

   }

  }catch(error){

   console.log("Queue fetch error:", error);

  }

 };

 useEffect(()=>{

  // initial load
  fetchQueue();

  // socket update
  socket.on("queueUpdated", ()=>{
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

 <div className="display-board">

  <h1 className="mb-4">
   <i className="bi bi-ticket-perforated me-2"></i>
   Fee Payment Queue
  </h1>

  {/* CURRENT TOKEN */}

  <div>

   <p>NOW SERVING</p>

   <div className="current-display">
    {currentToken ? currentToken : "--"}
   </div>

  </div>

  {/* NEXT TOKENS */}

  <div className="next-tokens">

   {nextTokens.length > 0 ? (

    nextTokens.map((token)=>(
     <div
      key={token._id}
      className="next-token-box"
     >
      {token.tokenNumber}
     </div>
    ))

   ) : (

    <p>No tokens in queue</p>

   )}

  </div>

  {/* COUNTER */}

  <div className="counter-box">

   <i className="bi bi-bank2 me-2"></i>
   Counter 1

  </div>

 </div>

 );

}