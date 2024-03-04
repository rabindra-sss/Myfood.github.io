import { Button } from 'bootstrap/dist/js/bootstrap.bundle';
import React, { useState } from 'react'
import { useCart, useDispatch } from './ContextReducer';
import { useNavigate } from 'react-router-dom';

export default function Card(props) {
  let cartList = useCart();
  let dispatch = useDispatch();

  let navigate = useNavigate();
  let options= props.fooditem.options[0];
  let priceoptions = Object.keys(options); //array of object keys
  
  const [qty, setqty] = useState(1); //default value
  const [size, setsize]= useState(priceoptions[0]);
 
  let price = options[size];
  let finalPrice= qty * parseInt(price);

  const handleAddtoCart= async ()=>{
    if(!localStorage.getItem("authToken") && !props.islogged) {
      navigate('/login');
      return;
    }
    for(const item of cartList) {
      if(item.id===props.fooditem._id) {
        if(item.size===size){ item.qty= qty.toString();
        return}; //instead of adding same food in cart just increase qty
      }
    }
    await dispatch({type: "ADD", data: {id: props.fooditem._id, name:props.fooditem.name, img: props.fooditem.img, size: size, price:price, qty: qty.toString(), finalPrice: finalPrice}} )
  }


  return (
    <div>
        <div className="card mt-2" style={{"width": "18rem", "maxHeight": "400px"}}>
          <img src={props.fooditem.img} className="card-img-top" alt="..." style={{height: "160px", objectFit:"fill"}}/>
            <div className="card-body">
              <h5 className="card-title">{props.fooditem.name}</h5>
              <p className="card-text">description</p>
              <div className='container  w-120 '>
                 <select className="m-1  h-100 bg-dark rounded" onChange={(e)=> setqty(e.target.value)}>
                   {
                    Array.from(Array(6), (e,i)=>{
                      return <option key={i+1} value= {i+1}>{i+1}</option>
                    })
                   }
                 </select>
                 <select className="m-1  h-100 bg-dark rounded" onChange={(e)=>setsize(e.target.value)}>
                  {
                    priceoptions.map((optionKey)=>{
                      return(<option key={optionKey} value={priceoptions.optionKey}>{optionKey}</option>)
                    })
                  }
                   
                 </select>

                  <div className='d-inline fs-6'> ₹{finalPrice}/- </div>
                </div>
                <hr>
                </hr>
                <button className='btn btn-warning justify-center ms-2' onClick={handleAddtoCart}>Add to Cart</button>
              
            </div>
        </div>
    </div>
  )
}
