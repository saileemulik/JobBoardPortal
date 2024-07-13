import React, { useState } from 'react';
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin, FaGlobe } from 'react-icons/fa';
import './contact.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../store/auth';
import{  toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Contact = () => {
  const defaultContactFormData = {
    username: "",
    email: "",
    message: "",
  };
  const [contact, setContact] = useState(defaultContactFormData);
  const [userData, setUserData] = useState(true);
const {user} = useAuth();
if(userData && user){
  setContact({
    username: user.username,
    email : user.email,
    message: "",
  });
  setUserData(false);
}
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/form/contact",{
        method: "POST",
        headers: {
          'Content-Type':"application/json",
        },
        body:JSON.stringify(contact),
      });
      const data = await response.json();
      if(response.ok){
        setContact(defaultContactFormData);
       
        console.log(data);
        toast.success("Message sent successfully");
      }
      else{
        toast.error(data.extraDetails ? data.extraDetails: data.message);
      }
    }
     catch (error) {
      console.log(error);

    }
    console.log(contact);
  };

  const handleTextareaChange = (event) => {
    setContact({
      ...contact,
      message: event.target.value,
    });
  };

  return (
    <>
      <div>
        <div className='bg-light p-4 text-center border-bottom border-dark'>
          <h2>Contact Us</h2>
        </div>

        <div>
          <div className="contacts text-center p-4" >
            <h3 className="text-white p-2">Reach Out Us</h3>
            <form action="POST" onSubmit={handleSubmit} className='inputs'>
              <input type='text' placeholder='Username' name='username' id='username' required autoComplete="off" className='inputs mt-4 mb-4 border-bottom border-light' value={contact.username} onChange={handleInput} /> <br />
              <input type='email' placeholder='Email' name='email' id='email' required autoComplete="off" value={contact.email} className='inputs mt-2 mb-4 border-bottom border-light' onChange={handleInput} /> <br />
              <textarea id="myTextarea" value={contact.message} onChange={handleTextareaChange} className='inputs mt-2 mb-4 border-bottom border-light' rows="4" cols="26 " name='message' required autoComplete="off" placeholder='Message' /><br />
              <button className='btn btn-warning'>Send Message</button>
            </form>
          </div>
          <div className='connect text-center p-3'>
            <h3 >You can also connect with</h3>
            <p >We are open for your suggestion or can have a chat</p>
            <div className=' bg-light mb-2 p-3 '><FaInstagram className="instagram ml-4 mr-1" /> Instragram: job_board </div>
            <div className='bg-light  mb-2 p-3'><FaFacebook className="facebook ml-3 mr-1" /> Facebook: Job_board </div>
            <div className='bg-light  mb-2 p-3'><FaTwitter className="twitter ml-0  mr-1" /> Twitter: job_board</div>
            <div className='bg-light  mb-2 p-3'><FaLinkedin className="linkedin ml-2 mr-1" /> LinkedIn: Job Board</div>
            <div className='bg-light p-3 '><FaGlobe className="website  ml-5 mr-1" /> Website: www.jobboard.in</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
