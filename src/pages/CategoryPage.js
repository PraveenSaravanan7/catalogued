import React, { useEffect, useState } from 'react'
import { Header_two } from "../components/Header_two";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { useInView,InView } from 'react-intersection-observer';
import { GridBox } from '../components/GridBox';
import StackGrid from "react-stack-grid";
import { Link, useLocation } from 'react-router-dom';
import axios from "../api";
import FeatherIcon from "feather-icons-react";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { WhatsAppBtn } from "../components/WhatsAppBtn";

const ls = require("local-storage")
export const CategoryPage = ({match}) => {
    
    var [loading, setloading] = useState(true);
    var [err, seterr] = useState(false);
    var [tab1post,settab1post]=useState([])
    var [skip1,setskip1]=useState(0)
    var [stopfetch1,setstopfetch1]=useState(false)
    var [copied, setcopied]=useState("")
    var [userid,setuserid]=useState(null)
    var [name,setname]=useState(null)
    var query=new URLSearchParams(useLocation().search)
    var [wa,setwa]=useState(null)
    var {id}=match.params
    var [deleted,setdeleted]=useState(false)
    var [showdltbtn,setshowdltbtn]=useState(false)
 
    var [cat,setcat]=useState(null)
    async function Getposts() {
        //setloading(true)
        seterr(false)
        try {      
          var queryparams=""
          var url= "/posts?"
          var x=skip1
          queryparams+="skip="+ x +"&category="+ id
         
          const response = await axios.get(url+queryparams);
          console.log(response.data)
          
          settab1post( tab1post.concat(response.data))
          setskip1(skip1+10)       
         
          if(!response.data[0] || response.data.length <10){setstopfetch1(true);
            console.log("stoped");}

          if(response.data.length ==0){
            setshowdltbtn(true)
          }
         
          //setloading(false)
        } catch (error) {
          seterr(error);
         // setloading(false)
        }
      }
      async function Getpost() {
        setloading(true)
        seterr(false)
        try {      
          var queryparams=""
          var url= "/posts/getpost/"+id
         
          const response = await axios.get(url);
          console.log(response.data)
          if(response.data.length >0){
            setuserid(response.data[0].userid)
            setname(response.data[0].title)
         
            setcat(response.data[0])
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
           {err  &&  <h1 className="mt70" >Category not Found.</h1>  }

            { !loading&& !err &&
            <div>
              
            {/* <Header_two name={query.get("category")} ></Header_two> */}
            { !deleted && <div className=" mt70  mb-5"> 
          
            <h1>{name}</h1>
            {userid ==  ls("user_id") ? <>
            <div className="mb-3" >
              <Link to={"/addpost?type=category&category="+id} >
              <button className="btn btn-dark btn-sm" > <FeatherIcon icon="plus" ></FeatherIcon> Add category </button>
              </Link>
              <Link to={"/addpost?type=product&category="+id} >
              <button className="btn btn-dark btn-sm ml-2" > <FeatherIcon icon="plus" ></FeatherIcon> Add product </button>
              </Link>
              {showdltbtn &&
              <button className="btn btn-danger mt-2" onClick={()=>{DeletePost(cat._id)}} >Delete category</button>}
            </div>
          </> : <>
            </>}
      <div>
      <ResponsiveMasonry
                columnsCountBreakPoints={{350: 2, 750: 3, 900: 3}}
            >
      <Masonry gutter="5px">
        { tab1post.map((post)=> <GridBox key={post._id} data={post} setcopied={setcopied} ></GridBox> )  }
        </Masonry>
        </ResponsiveMasonry>
        </div>
          {!stopfetch1 &&
            <InView as="div" onChange={(inView, entry) =>{if(inView){Getposts()}}}>
             <div className="container mb-4 text-center"  ><div className="spinner-border text-primary" role="status"  ></div>
              </div>
              </InView>}
              {wa &&   
              <WhatsAppBtn num={wa} ></WhatsAppBtn>}
            </div>}
            {deleted && <h1 className="mt70" >DELETED !!!</h1> }
        </div>
        }
         {loading&& <Loading></Loading> }
        </div>
    )
}
