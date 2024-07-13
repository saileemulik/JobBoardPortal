import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './resume.css';
import { useState } from 'react';
import{  toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const Resume = () => {
    const [name, setName] = useState(" ");
    const [file, setFile] = useState(" ");
    // eslint-disable-next-line
    const [allImage, setAllImage] = useState(null);
const getPdf = async()=>{
    const result = await axios.get("http://localhost:5000/api/get-files");
    console.log(result.data.data);
    setAllImage(result.data.data);
};

    const submitImage = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("name",name);
        formData.append("file",file);
        console.log(name,file);
        
        const response=await axios.post("http://localhost:5000/api/files",formData,
        {
            headers:{"Content-Type":"multipart/form-data"},
        });
         console.log(response);
       if (response.data.status==="ok"){
        toast.success("Resume Uploaded Successfully");
        getPdf();
       }        
         
    };
  return (
    <>
    <div className='resume'>
    <p className='text-warning font-weight-bolder fs-3'>Upload your resume and get selected !!</p>
       <form className='formstyle mt-5 mb-5' onSubmit={submitImage}>
                <h4>Upload Resume in pdf</h4> <br/>
                <input type='text' className='form-control' placeholder='Name of the Candidate' required onChange={(e)=>setName(e.target.value)}/> <br/>
                <input type='file' className='form-control' accept='application/pdf' required onChange={(e)=>setFile(e.target.files[0])}/> <br/>
                <button className='btn btn-primary' type='submit'>Submit</button>
       </form>
    </div>
      
    </>
  )
}

export default Resume
