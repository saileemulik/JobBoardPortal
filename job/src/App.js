import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import Login from './components/navbar/login/Login';
import Signup from './components/navbar/signup/Signup';
import Marquee from './components/marquee/Marquee';
import Contact from './components/contact/Contact';
import Employee from './components/employee/Employee';
import Listing from './components/listing/Listing';
import Candidate from './components/candidate/Candidate';
import Post from './components/post/Post';
import Logout from './components/navbar/logout/Logout';
import Search from './components/search/Search';
import Resume from './components/resume/Resume';
import Display from './components/resume/Display';
function App() {
  return (
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/employee/:email" element={<Employee />} />
        <Route path="/candidate/:email" element={<Candidate />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/search" element={<Search />} />
        <Route path="/post" element={<Post />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/display" element={<Display />} />
      </Routes>
      <Marquee/>
    </Router>
  );
}

export default App;
