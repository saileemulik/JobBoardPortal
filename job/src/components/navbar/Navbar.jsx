import React from 'react';
import './navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../store/auth';
import job1 from './job1.jpg';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  const {isLoggedIn ,user} = useAuth();
  const handleHover=(event)=>{
    event.target.style.color = '#007bff';
  };
  const handleLeave=(event)=>{
    event.target.style.color = '#0766AD';
  };
  return (
    
       <div >
      <nav className=" navbar navbar-expand-lg border-bottom border-dark p-1" >
  <div className="container-fluid bg-white "  >
    <img src={job1} alt="" className="navbar navbar-brand"/>
    <button
            className="navbar-toggler "
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
    <div className="collapse navbar-collapse justify-content-lg-between mt-2 ml-4 mb-2" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto m-auto size-4 text-lg">   
                {isLoggedIn ?(  <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dashboard
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item bg-light" href="/employee/:email"  style={{ color: '#0766AD' }}  onMouseEnter={handleHover} onMouseLeave={handleLeave}>Employee</a>
          <a className="dropdown-item bg-light" href="/candidate/:email"  style={{ color: '#0766AD' }} onMouseEnter={handleHover} onMouseLeave={handleLeave}>Candidate</a>
        </div>
      </li>) : (<><li className="nav-item ">
        <NavLink to="/" className="nav-link active  font-weight-bold text-xxl" activeclassname="active-link" style={{ color: '#0766AD' }} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
Home
</NavLink>
        </li> </>)}  
        <li className="nav-item ">
        <NavLink to="/contact" className="nav-link active  font-weight-bold text-xxl" activeclassname="active-link" style={{ color: '#0766AD' }} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
Contact
</NavLink>
        </li> 
        {isLoggedIn && <li className="nav-item ">
        <NavLink to="/search" className="nav-link active  font-weight-bold text-xxl" activeclassname="active-link" style={{ color: '#0766AD' }} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
Browse Jobs
</NavLink>
        </li> }
      </ul>
      <div className="d-flex">
              {isLoggedIn ? (
                <>
                {/* <Search /> */}
                <button className='btn btn-danger mr-2' type="button">
                  <NavLink to="/logout" className='text-white' style={{ textDecoration: 'none' }}>Logout</NavLink>
                </button>
                <h5>{user.email}</h5>
                </>
              ) : (
                <form className="d-flex">
                  <button className='btn btn-primary' type="button">
                    <NavLink to="/login" className='text-white' style={{ textDecoration: 'none' }}>Login</NavLink>
                  </button>
                </form>
              )}
            </div>
     
    </div>
  </div>
</nav>
    </div>
    
  );
}

export default Navbar;
