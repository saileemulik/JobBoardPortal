import React from 'react';
// import { useLocation } from 'react-router-dom';
import './home.css';
const Home = () =>  {
  // const location=useLocation()
  
  return (
    <>
  <div className="bg-image-container">
  <div className="overlay text-center">
    <h2 className="innovative-heading display-4 font-weight-bold  d-none d-sm-block">Welcome to the Job Board!!!</h2>
    <br />
    <br />
    <h4 className="image-text lead font-weight-bold  d-sm-none">
      We are excited to explore job seekers to join our team. Your skills and talents are important to us, and we look forward to getting to know you better.
      <br />
      <br />
      Let's embark on this journey together and discover the opportunities that await.
    </h4>
    <h4 className="image-text lead font-weight-bold d-none d-sm-block fs-4">
      We are excited to explore job seekers to join our team. Your skills and talents are important to us, and we look forward to getting to know you better. <br /> <br />
      Let's embark on this journey together and discover the opportunities that await.
    </h4>
    <br />
    <br />
    <h5 className="blink-text text-warning d-none d-sm-block">Good luck!!</h5>
  </div>
</div>

 
    </>
  );
}

export default Home;
