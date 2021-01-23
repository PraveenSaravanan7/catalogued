import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from '../api'
import { Header } from "../components/Header";
import dp from "../assets/dp.svg"
import './UserPage.css'
import FeatherIcon from "feather-icons-react";
import { WhatsAppBtn } from "../components/WhatsAppBtn";
import { Loading } from "../components/Loading";
import walogo from "../assets/whatsapp.svg"
import { useInView,InView } from 'react-intersection-observer';
import { GridBox } from '../components/GridBox';
import StackGrid from "react-stack-grid";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
const copy = require('clipboard-copy')
const ls = require("local-storage")
export const UserPage = ({ match }) => {
  var [user, setuser] = useState([])
  var [loading, setloading] = useState(true);
  var [err, seterr] = useState(false);
  var [tab1post,settab1post]=useState([])
  var [skip1,setskip1]=useState(0)
  var [stopfetch1,setstopfetch1]=useState(false)
  var [copied, setcopied]=useState("")
  var { id } = match.params
  async function Getposts() {
    //setloading(true)
    seterr(false)
    try {      
      var queryparams=""
      var url= "/posts?"
      var x=skip1
      queryparams+="skip="+ x +"&category="+ user._id
     
      const response = await axios.get(url+queryparams);
      console.log(response.data)
    
      settab1post( tab1post.concat(response.data))
      setskip1(skip1+10)       
      if(!response.data[0] || response.data.length <10){setstopfetch1(true);
        console.log("stoped");}
     
      //setloading(false)
    } catch (error) {
      seterr(error);
      //setloading(false)
    }
  }
  async function Getuser() {
    setloading(true)
    seterr(false)
    try {
      let { id } = match.params
      var url = id == 'me' ? '/users' : '/users/' + id
      const response = await axios.get(url);
      console.log(response.data);
      setuser(response.data)
      setloading(false)
    } catch (error) {
      seterr(error);
      setloading(false)
    }
  }
  useEffect(() => {
    console.log("effect")
    Getuser()
  }, [])
  return (
    <div className="mb-5" >
      <Header login={false} ></Header>
      {err  &&  <h1 className="mt70" >User not Found.</h1>  }
      {!loading&& !err && <> <div className="mt70" >
        <img className="m-auto dp2" src={user.profilepic ? user.profilepic : dp} />

        <div className="mt-3" >
          <div className="row" >
            <div className="col" >  <h3 className="mb-0" >{user.name} </h3></div>
            <div className="col-2" >
              <span onClick={()=>{copy(window.location.host+"/#/user/"+user._id)}} >
              <FeatherIcon icon="share-2" className="mt-2" ></FeatherIcon>
              </span>
            </div>
          </div>
         
          <div className="mt-1 text-medium font-weight-bold " > {user.description}</div>

          <div className=" mt-1 text14 font-weight-bold" > <FeatherIcon size={14} icon="map-pin" ></FeatherIcon> {user.address + ", " + user.state + ", " + user.country} </div>

          {user._id == ls("user_id") ? <> <Link to={"/editprofile"} > <button className="btn btn-primary btn-sm mt-2 " > <FeatherIcon icon="edit" size={18} ></FeatherIcon> Edit Profile</button></Link>
            <div className="mt-2" >
              <Link to={"/addpost?type=category&category="+user._id} >
              <button className="btn btn-dark btn-sm" > <FeatherIcon icon="plus" ></FeatherIcon> Add category </button>
              </Link>
              <Link to={"/addpost?type=product&category="+user._id} >
              <button className="btn btn-dark btn-sm ml-2" > <FeatherIcon icon="plus" ></FeatherIcon> Add product </button>
              </Link>
            </div>
          </> : <>
            </>}

        </div>
        <div>
        </div>

        <div className=" mt-3 mb-5">      
          <div class="">
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
              
        </div>
      </div>
      <WhatsAppBtn num={user.whatsapp} ></WhatsAppBtn>
      </>
    }
      {loading&& <Loading></Loading> }
    </div>
  )
}
