import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, NavLink } from 'react-router-dom';
import './employee.css';
import Listing from '../listing/Listing';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
const Employee = () => {
  const { email } = useParams();
  const scrollToJobListings = () => {
    scroll.scrollTo('jobListingsSection', { smooth: true, duration: 500 });
  };
  return (
    <>
  <div className="employee-container text-center mb-5">
  <div className="image-overlay">
    <h1 className="mt-5  text-dark">Employer Dashboard</h1>
    <h3 className="mt-5  text-dark">Welcome, {email} !!</h3>
    <p className="mt-5 message text-danger font-weight-bolder">
      We are excited to have you on board.
      <br /> This is your personalized dashboard where you can manage your tasks and stay updated with company news.
      <br/> Also you can have a look on resume of the candidates and can post the job as required by your company.
    </p>
    <button className="btn btn-warning mt-5 mb-5" type="button" onClick={scrollToJobListings}>
      <ScrollLink to="jobListingsSection" smooth={true} duration={500}>
        Job Listings
      </ScrollLink>
    </button>
    <button className="btn btn-success ml-2 mt-5 mb-5" type="submit">
    <NavLink to="/post" className='text-white' style={{ textDecoration: 'none' }}>Post Job</NavLink>
    </button>
    <button className="btn btn-primary ml-2 mt-5 mb-5" type="submit">
    <NavLink to="/display" className='text-white' style={{ textDecoration: 'none' }}>See Uploaded Resume</NavLink>
    </button>
  </div>
</div>
    <Listing id="jobListingsSection"/>
    </>
  );
};

export default Employee;
