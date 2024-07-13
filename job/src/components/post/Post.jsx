import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import{  toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../store/auth';
import './post.css';
const URL =`http://localhost:5000/api/data/listing`;
const Post = () => {
    const {  setListing } = useAuth();
  const [jobDetails, setJobDetails] = useState({
    company: '',
    location: '',
    title: '',
    description:'',
    requirements:'',
    posted_at: '',
    deadline: '',
  });
  const navigate = useNavigate();
  const [user] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prevJobDetails) => ({
      ...prevJobDetails,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();
      
    
      setJobDetails((prevJobDetails) => ({
        ...prevJobDetails,
        posted_at: formattedDate,
      }));
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobDetails),
      });
      const res_data = await response.json();
      console.log("Full server response:", res_data);
      if (response.ok) {
        
        console.log("res from server", res_data.extraDetails);
        setListing?.(res_data.token);
        setJobDetails({
          company: '',
          location: '',
          title: '',
          description: '',
          requirements: '',
          posted_at: '',
          deadline: '',
        });
        toast.success("Job Posted Successfully");
        navigate(`/employee/${user.email}`, { employerName: user.email });
      } else {
        // Handle error
        console.error("Error from server:", res_data);
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      // Handle network or other errors
      toast.error("Post", error);
    }
    console.log('Job details submitted:', jobDetails);
  };
  

  return (<>
<div className='background'>
    <div className="containers  ">
    <div className='text-center pb-5'>
      <h2 className='pt-5 heading'>Post a Job</h2>
      <form onSubmit={handleSubmit} className='mb-3 mt-4'>
      <div className="mb-3 font-weight-bold">
        <label>
          Company: 
          <input type="text" name="company" value={jobDetails.company} onChange={handleChange} className='text' />
        </label>
        </div>
        <div className="mb-3  font-weight-bold">
        <label>
          Location: 
          <input type="text" name="location" value={jobDetails.location} onChange={handleChange}  className='text'/>
        </label>
        </div>
        <div className="mb-3  font-weight-bold">
        <label>
          Job Title:
          <input type="text" name="title" value={jobDetails.title} onChange={handleChange} className='text' />
        </label>
        </div>
        <div className="mb-3  font-weight-bold">
        <label>
          Job Description:
          <textarea type="text" name="description" value={jobDetails.description} onChange={handleChange} className='text' />
        </label>
        </div>
        <div className="mb-3  font-weight-bold">
        <label>
          Job Requirements:
          <textarea type="text" name="requirements" value={jobDetails.requirements} onChange={handleChange} className='text'/>
        </label>
        </div>
        <div className="mb-3  font-weight-bold">
        <label>
          Posted At:
          <input type="text" name="posted_at" value={jobDetails.posted_at} onChange={handleChange} className='text' />
        </label>
        </div>
        <div className="mb-3  font-weight-bold">
        <label>
          Deadline:
          <input type="text" name="deadline" value={jobDetails.deadline} onChange={handleChange} placeholder='YYYY-MM-DD' className='text'/>
        </label>
        </div>
        <br />
        <button className='btn btn-warning' type="submit">
        Submit
                  </button>
      </form>
    </div>
    </div>
    </div>
    </>
  );
};

export default Post;
