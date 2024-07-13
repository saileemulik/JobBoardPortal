import React, {useState } from 'react';
// import axios from 'axios';
import { useAuth } from '../../../store/auth';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import{  toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const URL = `http://localhost:5000/api/auth/login`;
const Login = () => {
  const navigate= useNavigate();
  const [user, setUser] = useState({
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
  const { storeTokenInLS} = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User State:", user);
    try {
      const response = await fetch (URL, {
           method: "POST",
           headers: {
            "Content-Type": "application/json",
          },
           body:JSON.stringify(user),
      });
      console.log("login",response);
      const res_data = await response.json();
    if(response.ok){
      console.log("Data:",user);
      toast.success("Login Successfully");
     console.log("res from server",res_data);
      storeTokenInLS(res_data.token);
      setUser({
        email: "",
        password: "",
        userType: "",
      });
      // navigate(`/employee/${user.email}`, { employerName: user.email });
      if (user.userType === "employer") {
        navigate(`/employee/${user.email}`, { employerName: user.email });
      } else if (user.userType === "candidate") {
        navigate(`/candidate/${user.email}`, { candidateName: user.email });
      }
    }else{
      toast.error(res_data.extraDetails ? res_data.extraDetails: res_data.message);
    }
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = (e) => {
    setUser({ ...user, userType: e.target.value });
  };

  return (
    <div className='login'>
    <h3 className='pt-4'>LOGIN</h3>
      <FaUser className='icon' /> 
      <form  className="form" onSubmit={handleSubmit}>
        <FaEnvelope className='color' /><input type='email' onChange={handleInput} placeholder='E-mail' name='email' id='email' value={user.email} required autoComplete="off" className="mt-4" /> <br />
        <FaLock className='color' /><input type='password' onChange={handleInput} placeholder='Password' name='password' id='password' value={user.password} required autoComplete="off" className="mt-4" /> <br />
        <label htmlFor="userType" className='mt-3 text-secondary'>Select User Type:</label> <br />
        <select
          id="userType"
          name="userType"
          value={user.userType}
          onChange={handleInputChange}
          required autoComplete="off">
          <option value="">Select...</option>
          <option value="employer">Employer</option>
          <option value="candidate">Candidate</option>
        </select>
        <br />
        <button type="submit" className="btn btn-secondary mt-4">
          Submit
        </button>
      </form>
      <br />
      <h6 className='text-dark'>
        OR <br />
        Don't Have an Account?
      </h6>
      <button className='btn btn-dark' type="button">
        {' '}
        <Link to="/signup" className=' text-white' style={{ textDecoration: 'none' }}>
          Signup{' '}
        </Link>{' '}
      </button>

    </div>
  );

};
export default Login;
