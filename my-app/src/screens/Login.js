import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  let [credentials, setcredentials] = useState({ email: "", password: "" });
  let [confirm, setconfirm] = useState("");
  const navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = await fetch("http://localhost:8080/api/v1/auth/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    })

    response = await response.json();

    if(!response.success) {
      alert("Enter valid credentials")
    }

    if(response.success) {
      localStorage.setItem("authToken",response.token);
      navigate('/');
    }
  }

  const changeInput = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });

  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className='text-center text-primary fs-3'> Login</div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
          <input type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" value={credentials.email} onChange={changeInput} />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
          <input type="password" className="form-control" name='password' id="exampleInputPassword1" value={credentials.password} onChange={changeInput} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <Link to="/register"> New User? Register </Link>
    </div>
  )
}