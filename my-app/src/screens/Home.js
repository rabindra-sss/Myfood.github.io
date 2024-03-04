import React from 'react'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'

export default function Home() {
  const [search, setsearch] = useState("");
  const [foodcat, setfoodcat] = useState([]);
  const [fooditems, setfooditems] = useState([]);
  const [islogged, setislogged ] = useState(false);
  
  const loadData = async () => {

    
    let response = await fetch("http://localhost:8080/api/v1/food/get-food", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer' + ' ' + localStorage.getItem("authToken")
    },
    })

    response = await response.json();

    setfooditems(response.fooditems);
    setfoodcat(response.foodcat);
    setislogged(response.islogged);
    
    let logged= response.islogged;

  }

  useEffect(() => {
    loadData();
  }, []);


  return (
    <div>
      <div><Navbar islogged={islogged} ></Navbar></div>
      <div>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2 bg-white" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}} />
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
              </div> 
            </div>
            <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/1000×500/?burger" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/1000×500/?pizza" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/1000×500/?pasta" className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container '>
        {

          foodcat.length !== 0
            ? foodcat.map((data) => {
              return (
                <div key={data.CategoryName} className='row mb-3'>
                  <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                  <hr />

                  {

                    fooditems.length !== 0
                      ? fooditems.filter(
                        (item) => (item.CategoryName === data.CategoryName)
                        && (
                             (item.name.toLowerCase().includes(search.toLocaleLowerCase())) || 
                             (item.CategoryName.toLowerCase().includes(search.toLocaleLowerCase()))
                           )
                        )
                      .map((filtereditem) => {
                        return (

                          <div key={filtereditem._id} className="col-12 col-md-6 col-lg-3" >
                            <Card fooditem ={filtereditem} islogged={islogged}></Card>
                          </div>



                        )
                      })
                      : ""
                  }


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


