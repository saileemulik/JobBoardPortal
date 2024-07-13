import React, { useState } from 'react';
import { useAuth } from '../../../store/auth';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import{  toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './signup.css';
const URL =`http://localhost:5000/api/auth/signup`;
const Signup = () => {
  const navigate = useNavigate();
  const {storeTokenInLS } = useAuth();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    userType: "",
  });
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();
      console.log("res from server",res_data.extraDetails);

      if (response.ok) {
      
       storeTokenInLS(res_data.token);
        setUser({
          username: "",
          email: "",
          password: "",
          userType: "",
        });
        toast.success("Sigin Successfully");
        navigate("/login");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails: res_data.message);
     }
    } catch (error) {
      console.log("Signup", error);
    }
  };

  const handleInputChange = (e) => {
    setUser({ ...user, userType: e.target.value });
  };


  return (
    <div className='signup'>
    <h3 className='pt-5'>SIGN UP</h3>
      <FaUser className='icon' />
      <form className="form" onSubmit={handleSubmit}>
        <FaUser className='color' /><input type='text' onChange={handleInput} placeholder='Username' name='username' id='username' value={user.username} required autoComplete="off" className="mt-4" /> <br />
        <FaEnvelope className='color' /><input type='email' onChange={handleInput} placeholder='E-mail' name='email' id='email' value={user.email} required autoComplete="off" className="mt-4" /> <br />
        <FaLock className='color' /><input type='password' onChange={handleInput} placeholder='Password' name='password' id='password' value={user.password} required autoComplete="off" className="mt-4" /> <br />
        <label htmlFor="userType" className='mt-4 text-secondary'>Are you an employer or a candidate?</label>
        <select id="userType" name="userType" value={user.userType} onChange={handleInputChange} required autoComplete="off" className='mt-1'>
          <option value="">Select...</option>
          <option value="employer">Employer</option>
          <option value="candidate">Candidate</option>
        </select> <br />
        <button type="submit" className="btn btn-secondary mt-4">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
