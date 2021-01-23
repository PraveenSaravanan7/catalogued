import React, { useEffect, useState } from 'react'
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import axios from "../api";
import FeatherIcon from "feather-icons-react";
import { WhatsAppBtn } from "../components/WhatsAppBtn";
const copy = require('clipboard-copy')
const ls=require("local-storage")
export const ProductPage = ({match}) => {
    var [loading, setloading]= useState(true)
    var [err, seterr] = useState(false);
    var [userid,setuserid]=useState(null)
    var [wa,setwa]=useState(null)
    var [product,setproduct]=useState(null)
    var [deleted,setdeleted]=useState(false)
    var {id}=match.params

    async function Getpost() {
        setloading(true)
        seterr(false)
        try {      
          var url= "/posts/getpost/"+id
         
          const response = await axios.get(url);
          console.log(response.data)
          if(response.data.length >0){
            setuserid(response.data[0].userid)
            setproduct(response.data[0])            
          }
          setloading(false)
        } catch (error) {
          seterr(error);
         setloading(false)
        }
      }
      async function Getuser() {
        // setloading(true)
        // seterr(false)
        try {
            console.log(userid)
          var url = '/users/' + userid
          const response = await axios.get(url);
          console.log(response.data);
          setwa(response.data.whatsapp)
        } catch (error) {
         
        }
      }
      async function DeletePost(pid) {
        try {   
            var url="/posts?pid="+pid    
          
          const response = await axios.delete(url);         
          console.log(response.data);
          setdeleted(true)
          window.scrollTo(0, 0)
        } catch (error) {
          console.log(error)
        }
      }
      useEffect(()=>{
          if(userid){
              Getuser()
          }
      },[userid])
      useEffect(()=>{
          Getpost()
      },[])
    return (
        <div>
            <Header></Header>
      {err  &&  <h1 className="mt70" >Product not Found.</h1>  }

            {!loading && !err &&
            <>
            {!deleted &&
                <div className="mt70 mb-5" >
                    <div className="product-div " >
                    <img className="product-img m-auto" src={product.photo}  />
                    <div className="px-2" >
                    <h4 className="mt-3 mb-0" >{product.title}</h4>
                    <h6 className="text-muted" >{product.description } </h6>
                    <h2 className="mt-2" >₹ {product.price} </h2>
                    <div className="row mt-2" >
                        <div className="col pr-0" >
                       {wa && <a type="button" target="_blank" href={"https://wa.me/91"+wa+"?text= I want *"+product.title+"*. %0A %0A Product_URL: http://"+window.location.host+"/"+"%23/product/"+product._id} className="btn btn-block btn-primary" > Buy Now </a>}
                        </div>                      
                        <div  className="col-4 text-right"  >
                            <span  onClick={()=>{copy(window.location.href)}} >
                        <FeatherIcon icon="heart" className="mt-2 mr-3" ></FeatherIcon> </span>
                        <FeatherIcon icon="share-2" className="mt-2" ></FeatherIcon> 
                        </div>
                    </div>
                    </div>
                    </div>
                    {product.userid==ls("user_id")?<button onClick={()=>{DeletePost(product._id)}} className="btn btn-danger mt-3" >Delete Product</button>:<></>} 
                </div>
                }
                {deleted &&  <h2 className="mt70" >DELETED !!!</h2> }
                {wa &&
                <WhatsAppBtn num={wa} ></WhatsAppBtn>}
            </>
            }
            {loading &&  <Loading></Loading> }
        </div>
    )
}
