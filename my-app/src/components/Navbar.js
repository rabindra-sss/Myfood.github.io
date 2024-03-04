import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Badge from 'react-bootstrap/Badge'
import { useCart } from './ContextReducer';
import Modal from './Modal';
import Cart from './Cart';
export default function Navbar(props) {
  

  const navigate= useNavigate();
  const handlelogout =()=>{
    confirmAlert({
      title: 'Confirm to Log Out',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            localStorage.removeItem("authToken");
            navigate('/');
            navigate(0);
          }
        },
        {
          label: 'No',
          onClick: () => {alert('Click No');

        }
        }
      ]
    });
  }
  
  let cartList=useCart();

  const [cartview, setcartview]= useState(false);
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">CFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {
              (localStorage.getItem("authToken")&& props.islogged) ?
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/orders">My Orders</Link>
              </li>
              :""
            }
            </ul>

            
            <div className='d-flex'>
            {
              (!localStorage.getItem("authToken")) ?
                <div>
                  <Link className="btn bg-danger text-white mx-1" to="/login">Login</Link>
                  <Link className="btn bg-success text-white mx-1" to="/register">Signup</Link>
                </div>
              : <div>              
                  <div className="btn bg-white fs-6 text-success mx-1" onClick={()=>setcartview(true)}>
                    My Cart{" "}
                    <Badge pill>{cartList.length}</Badge>
                  </div>
                  
                  {cartview ? <Modal onClose={()=>setcartview(false)}><Cart></Cart></Modal>: null}
                  <div className="btn bg-white fs-6 text-danger mx-1" onClick= {handlelogout}>Log Out</div>
              </div>
            }
              
                
              
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
