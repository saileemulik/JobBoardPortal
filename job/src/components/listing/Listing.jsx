import React from 'react';
import  { useState, useEffect } from 'react';
import financial from './financial.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../store/auth';
import './listing.css';


const Listing = () => {
  const { listing, setListing } = useAuth();
  const [selectedJob, setSelectedJob] = useState(null);
  // eslint-disable-next-line
  const [searchQuery, setSearchQuery] = useState('');

  const URL = `http://localhost:5000/api/search?q=${searchQuery}`;

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line
  }, [searchQuery, setListing]);

  const fetchJobs = async () => {
    try {
      console.log('Fetching jobs...');
      const response = await fetch(URL);
      console.log('Response:', response);
      if (response.ok) {
        const data = await response.json();
        console.log('Search Query:', searchQuery);
        console.log('Response Content:', response);
        console.log('Parsed Response Data:', data);
        console.log('API Response:', data);
        if (data.length > 0) {
          setListing?.(data);
        } else {
          setListing?.([]);
        }
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleJobDetailsClick = (job) => {
    setSelectedJob(job);
  };

  const handleClosePopup = () => {
    setSelectedJob(null);
  };

  const renderedListings = Array.isArray(listing) && listing.length > 0 ? (
    listing.map((curElem, index) => (
      <div className='card' key={index} >
        <div className='card-img'>
          <img src={financial} alt="" className="" width={200} height={200} />
        </div>
        <div className='card-details'>
          <div className='grid grid-two-cols'>
            <p>{curElem.company}</p>
            <p>{curElem.location}</p>
          </div>
          <h2>{curElem.title}</h2>
          <p>{curElem.posted_at}</p>
          <p>{curElem.deadline}</p>
          <button onClick={() => handleJobDetailsClick(curElem)} className='btn btn-info text-center'>View Details</button>
        </div>
      </div>
    ))
  ) : (
    <p>No results found.</p>
  );

  return (
    <>
      <section className='section-listings' id="jobListingsSection">
       
        <div className='container mt-5 text-center text-dark mb-4 bg-info'>
          <h1 className=''>Listings</h1>
        </div>
        <div className='container grid grid-three-cols'>
          {renderedListings}
        </div>
      </section>
      {selectedJob && (
        <div className='popup'>
          <div className='popup-content text-center bg-light'>
            <span className='close' onClick={handleClosePopup}>
              &times;
            </span>
            <h2>{selectedJob.title}</h2><br/>
            <p><b>Description:</b> {selectedJob.description}</p> <br/>
            <p><b>Requirements:</b> {selectedJob.requirements}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Listing;
