import React,{ useState} from 'react'
import {useNavigate} from "react-router-dom"
const network = "http://localhost:5000";
export default function SignUp() {  
  let navigate = useNavigate();
  const [NewUser,setNewUser]=useState({name:"",password:"",email:""});


  const submit=async(e)=>{
    e.preventDefault();
    const response = await fetch(`${network}/api/auth/signup`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(NewUser),
    });
    const json = await response.json();
    if(json.success===true){
       localStorage.setItem('token',json.msg);
       navigate('/home');
    }else {
      console.log(json.msg);
    }
  }
  const handleonchange=(e)=>{
    setNewUser({ ...NewUser, [e.target.name]: e.target.value });

  }
return (
  <>
    <div className="container my-4">
      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            onChange={handleonchange}
            id="name"
            name="name"
            placeholder='Enter Your Name'
            minLength={5} 
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            onChange={handleonchange}
            id="email"
            placeholder='Enter Your Email'
            name="email"
            required
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={handleonchange}
            name="password"
            placeholder='Enter Your Password'
            id="exampleInputPassword1"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  </>
);
}
