import { Link } from "react-router-dom";

export default function Navbar(){

 return(

 <nav className="navbar glass-navbar navbar-dark px-4">

  <Link className="navbar-brand text-white" to="/">
   <i className="bi bi-diagram-3-fill me-2"></i>
   Smart Queue
  </Link>

  <div className="d-flex gap-4">

   {/* display board */}

   <Link to="/display" className="text-white nav-icon">

    <i className="bi bi-display"></i>

   </Link>

   {/* admin login */}

   <Link to="/admin-login" className="text-white nav-icon">

    <i className="bi bi-person-gear"></i>

   </Link>

  </div>

 </nav>

 );

}