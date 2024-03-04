import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
export default function Signup() {
    let [credentials, setcredentials]= useState({name:"", email:"", password:""});
    let [confirm, setconfirm] =useState("");
    let navigate= useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();

        let response = await fetch("https://cfood-food-delivery-app.onrender.com/api/v1/auth/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
        })

        response = await response.json();

        if(response.success) {
            navigate('/login');
          }
    }

    const changeInput= (event)=>{
        setcredentials({...credentials,[event.target.name]: event.target.value});
        
    }

    return (
        <>
        <div className='container'>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label" >Name</label>
                    <input type="text" className="form-control" name='name' value={credentials.name} onChange={changeInput}/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
                    <input type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" value={credentials.email} onChange={changeInput}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
                    <input type="password" className="form-control" name='password' id="exampleInputPassword1" value={credentials.password} onChange={changeInput}/>
                </div>
                
                {/* <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" value={confirm} >Confirm Password</label>
                    <input type="password" className="form-control me-2" id="exampleInputPassword1" />
                    <div id="emailHelp" className="form-text">
                        {
                           confirm === credentials.password
                           ? ()=>{
                            return (<div></div>)
                           }: "password don't match"
                        }
                    </div>
                </div> 
                */}

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <Link to="/Login">Already a User? </Link>
        </div>
        </>
    )
}
