import React from 'react'

export default function OrderCard(props) {
    let item= props.item;
    let timestamp= item.createdAt;
    let todate=new Date(timestamp).getDate();
    let tomonth=new Date(timestamp).getMonth()+1;
    let toyear=new Date(timestamp).getFullYear();
    let original_date=tomonth+'/'+todate+'/'+toyear;
  return (
    <div>
        <div className="card mt-2" style={{"width": "20rem", "maxHeight": "400px"}}>
          <img src={item.img} className="card-img-top" alt="..." style={{height: "160px", objectFit:"fill"}}/>
            <div className="card-body">
              <h5 className="card-title fs-5">{item.name}</h5>
              <div className='container w-150'>
                 <div className="btn  h-50 rounded fs-6"> Qty:{" "} </div>
                 <div className="btn m-1  h-100 bg-warning rounded"> {item.qty} </div>
                 <div className="btn  h-100 rounded"> Size:{" "} </div>
                 <div className="btn m-1  h-100 bg-warning rounded">{item.size} </div>
              </div>
              <div className='d-inline fs-5'> Total Price: {" "} ₹{item.finalPrice}/- </div>
              <div className='fs-6'> order placed on {original_date}</div>
            </div>
        </div>
    </div>
  )
}
