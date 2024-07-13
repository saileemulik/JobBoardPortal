import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect,useState } from 'react';
import axios from 'axios';
import './display.css';
const Display= () => {
    const [allImage, setAllImage] = useState(null);
    useEffect(()=>{
      getPdf();
      // eslint-disable-next-line 
    },[])
const getPdf = async()=>{
    const result = await axios.get("http://localhost:5000/api/get-files");
    console.log(result.data.data);
    setAllImage(result.data.data);
};
const showPdf=(pdf)=>{
    window.open(`http://localhost:5000/files/${pdf}`,"_blank","noreferrer")
};
    return (
<>
<div className=' text-center  bg-light uploaded'>
       <h4 className='pt-5 fs-1 heading '>Uploaded Resume </h4>
       <p className='pt-3 fs-3 text-danger font-weight-bolder'>Here is the uploaded resume of the candidates which helps you to identify the best candidate suitable for the particular position in your company. </p>
       <div className='output-div pb-5 mt-5'>
       {allImage !== null && allImage.map((data)=>{
        return ( <div className='input-div' key={data._id}>
             <h6 className='fs-5 ml-3'>{data.name}</h6>
             <button className='btn btn-primary ml-3 ' onClick={()=>showPdf(data.pdf)}>Show Resume</button>
        </div>)
       })}
       </div>
        
       </div>
</>
    );
};

export default Display;
