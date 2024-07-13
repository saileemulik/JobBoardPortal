import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import financial from './financial.jpg';
import './search.css';
const Search = ({ onSearch, scrollToCard }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const handleJobDetailsClick = (job) => {
    setSelectedJob(job);
  };
  const handleClosePopup = () => {
    setSelectedJob(null);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/search?q=${searchTerm}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseBody = await response.text();
  
      if (!responseBody.trim()) {
        console.warn('Empty response from the backend');
        return;
      }
  
      const data = JSON.parse(responseBody);
  
      console.log('API Response:', data);
  
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received from the backend');
      }
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const displayResults = () => {
    return searchResults.map((curElem, index) => (
      <>
      <section className='search'>
      <div className='cards  ' key={index}>
        <div className='cards-img'>
          <img src={financial} alt="" className="" width={200} height={200} />
        </div>
        <div className='cards-details container  grids grids-three-cols'>
          <div className=' grids grids-two-cols'>
            <p>{curElem.company}</p>
            <p>{curElem.location}</p>
          </div>
          <h2>{curElem.title}</h2>
          <p>{curElem.posted_at}</p>
          <p>{curElem.deadline}</p>
          <button onClick={() => handleJobDetailsClick(curElem)} className='btn btn-info text-center'>View Details</button>
        </div>
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
      )}</>
    ));
  };

  return (
    <div className='text-center  bg-light'>
    <h1 className=' pt-5'>Find Available Jobs Easily </h1>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search Here' />
      <button className='btn btn-secondary ml-2 mt-5 mb-5' onClick={handleSearch}>Search</button>

      <div className='mb-5'>
        {searchResults.length === 0 ? (
          <><h4>Search Results:</h4>
          <p className='pb-5'>No results found.</p>
          </>
        ) : (
          <div><h4>Search Results:</h4>
            {displayResults()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
