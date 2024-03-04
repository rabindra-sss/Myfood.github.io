import React from 'react'
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import OrderCard from '../components/OrderCard';
import Footer from '../components/Footer';

export default function MyOrders() {

    const [orders, setorders] = useState([]);
    
    const getUniqueValues = (array) => (
        [...new Set(array)]
    )
    useEffect(()=>{
        
        const loadData = async () => {

            let response = await fetch("https://cfood-food-delivery-app.onrender.com/api/v1/order/get-order", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer' + ' ' + localStorage.getItem("authToken")
                },
            })
    
            response = await response.json();
            
            setorders(response.allorders)
            let dateArray = orders.map((item)=>{
                let timestamp= item.createdAt;
                let todate=new Date(timestamp).getDate();
                let tomonth=new Date(timestamp).getMonth()+1;
                let toyear=new Date(timestamp).getFullYear();
                let original_date=tomonth+'/'+todate+'/'+toyear;
                return original_date
            });
            dateArray=getUniqueValues(dateArray);
        }
        loadData();

    },[]);

    
    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div className='m-1 fs-4'> 
               <div className='text-warning'>All Orders</div>
             
                {
              
                    (orders.length !== 0)

                        ? orders.map((odereditem) => {
                            
                            return (

                                <div key={odereditem._id} className="col-12 col-md-6 col-lg-3" >
                                    <OrderCard item={odereditem}></OrderCard>
                                </div>



                            )
                        })
                        : ""
                }
            </div>
            <div><Footer></Footer></div>
        </div>
    )
}
