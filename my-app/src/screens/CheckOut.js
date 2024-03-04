import React from 'react'
import { useCart, useDispatch } from '../components/ContextReducer';
import { useNavigate } from 'react-router-dom';

export default function CheckOut() {
    let cartList=useCart();
    let dispatch= useDispatch();
    const navigate= useNavigate();

    const handleOrder = async (e)=>{

        e.preventDefault();

        let newArray= cartList.map((item)=>({
                    itemId:item.id,
                    name: item.name,
                    img: item.img,
                    size: item.size,
                    defaultPrice: item.price,
                    qty: item.qty,
                    finalPrice: item.finalPrice.toString()
                })
            )
        
        let response = await fetch("https://cfood-food-delivery-app.onrender.com/api/v1/order/create-order", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer'+' '+localStorage.getItem("authToken")
            },
            body: JSON.stringify(newArray)
        })

        response = await response.json();
        if(response.success){
            navigate('/');
            dispatch({type:"CLEAR"})
        }
    }

  return (
    <div>
        <div className='container m-5 '>
           <button type="submit" className="btn btn-primary fs-5" onClick={handleOrder}>Place Order</button>
        </div>
    </div>
  )
}
