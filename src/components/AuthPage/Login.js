import React ,{useState}from 'react'
import {useNavigate} from "react-router-dom"
const network = "http://localhost:5000";
export default function Login() {
  let navigate = useNavigate();
  const [User,setUser]=useState({email:"",password:""})
  const handlechange=(e)=>{
    setUser({ ...User, [e.target.name]: e.target.value });
  }
  const submit=async(e)=>{
    e.preventDefault();

    const response = await fetch(`${network}/api/auth/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(User),
    });
    const json = await response.json();
    if(json.success===true){

       localStorage.setItem('token',json.msg);
       console.log(json.msg);
       navigate('/home');
    }else {
      console.log(json.msg);
    }
  }

  return (

      <>
      <div className='container my-4' >
  
      <form onSubmit={submit}>
          
  
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" id="email" onChange={handlechange} name='email' aria-describedby="emailHelp"  required/>
      
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control" name="password" onChange={handlechange} id="exampleInputPassword1"required/>
    </div>
   
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
      </div>
      </>
    )
  }
  

