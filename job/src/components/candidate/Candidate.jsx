import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import './candidate.css';
import { NavLink} from 'react-router-dom';
import Listing from '../listing/Listing';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
const Candidate = () => {
  const { email } = useParams();
  const scrollToJobListings = () => {
    scroll.scrollTo('jobListingsSection', { smooth: true, duration: 500 });
  };
  return (
    <>
  <div className="candidate-container text-center mb-5">
  <div className="image-overlay">
    <h1 className="mt-5  text-dark">Candidate Dashboard</h1>
    <h3 className="mt-5  text-dark">Welcome, {email} !!</h3>
    <p className="mt-5 message text-danger font-weight-bolder fs-4">
    Congratulations on joining our platform! 
    <br/> This is your personalized dashboard where you can explore job opportunities, manage your applications, and stay updated with the latest openings. <br/>
    Upload your resume and wait for the opportunities !!!
    </p>
    <button className="btn btn-warning mt-5 mb-5" type="button" onClick={scrollToJobListings}>
      <ScrollLink to="jobListingsSection" smooth={true} duration={500}>
        Job Listings
      </ScrollLink>
    </button>
    <button className="btn btn-success ml-2 mt-5 mb-5" type="submit">
    <NavLink to="/resume" className='text-white' style={{ textDecoration: 'none' }}>Upload Resume</NavLink>
    </button>
  </div>
</div>
    <Listing id="jobListingsSection"/>
    </>
  );
};

export default Candidate;
