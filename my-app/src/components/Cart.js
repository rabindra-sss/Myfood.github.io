import React, { useState } from 'react'
import { useCart, useDispatch } from './ContextReducer'
import { Button } from 'bootstrap/dist/js/bootstrap.bundle';
import { Link } from 'react-router-dom';
import CheckOut from '../screens/CheckOut';

export default function Cart() {
    let CartList= useCart();
    let dispatch= useDispatch();
    
    if(CartList.length===0) return(
        <div className='m-5 w-100 text-center text-warning fs-5'>Cart is Empty</div>
    )
    let totalprice = CartList.reduce((total,food)=> total+food.finalPrice, 0)
   

    const removeitem= async(index)=>{ 
        await dispatch({type: "REMOVE", index: index} )
     }

     
    
  return (
    <div>
        <div className='container table-responsive table-responsive-sm table-responsive-md '>
            <table className='table '>
                <thead className='text-success fs-4'>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Qty</th>
                        <th scope='col'>Option</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        CartList.map((item,index)=>(
                            <tr>
                                <th scope='row'>{index+1}</th>
                                <td>{item.name}</td>
                                <td>
                                    <button onClick={()=>dispatch({type: "INCREASEQUANT", index: index})}>+</button>
                                    {item.qty}
                                    <button onClick={()=>dispatch({type: "DECREASEQUANT", index: index})}>-</button>
                                </td>
                                <td>{item.size}</td>
                                <td>{item.finalPrice}</td>
                                <td>
                                    <button onClick={()=>removeitem(index)}>Remove</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className='fs-3'> Total Price:
                ₹{totalprice}/-
            </div>
            <Link className='btn bg-success fs-3' to='/check-out'> Check Out</Link>
        </div>
        
    </div>
  )
}
