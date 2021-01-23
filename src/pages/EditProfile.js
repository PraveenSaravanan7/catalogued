import React, { useEffect, useState } from 'react'
import {Header_two} from '../components/Header_two'
import axios from '../api'
import { Profilepicedit } from "../components/Profilepicedit";
import { Loading } from "../components/Loading";
import { useHistory } from 'react-router-dom';
var worldMapData = require('city-state-country')
const ls=require("local-storage")

export const EditProfile = () => {
  const history=useHistory()

    var [user,setuser]=useState([])
    var [profilepic,setprofilepic]=useState(null)
    var [formData, updateFormData] = useState([]);
    var [loading,setloading]=useState(false);
    var [err,seterr]=useState(false);
    var [loadingsave,setloadingdsave]=useState(false);
    var [errsave,seterrsave]=useState(false);
    var [editsuccess,seteditsuccess]=useState(false)
    var [Country, updateCountry] = useState([]);
    var [States, updateStates] = useState([]);
    async function editprofile() {
        console.log(formData)
        setloadingdsave(true)
        seterrsave(false)
        try {           
          const response = await axios.put('/users',formData);         
          if(response){
            //console.log(response)
            setloadingdsave(false)
            seteditsuccess(true)
            //return true
          }
         
        } catch (error) {
          seterrsave(error);
          setloadingdsave(false)
        }
      }
  
    async function Getuser() {
        setloading(true)
        seterr(false)
        try {       
          var url='/users'
          const response = await axios.get(url);         
          console.log(response.data);
          setuser(response.data)
          setprofilepic(response.data.profilepic)
          setloading(false)
        } catch (error) {
          seterr(error);
          setloading(false)
        }
      }
    const handleChange = (e) => {
        updateFormData({
          ...formData,
          [e.target.name]: e.target.value.trim()
        });
      };
      function handleEdit(event){
          event.preventDefault();
            editprofile()
      }
      useEffect(() => {
          Getuser()
      }, [])
      useEffect(() => {
          if(formData.country){
          updateCountry(worldMapData.searchCountry(formData.country));          
          }
      }, [formData.country])
      useEffect(() => {
          if(formData.state){       
      updateStates(worldMapData.getAllStatesFromCountry(formData.country));          
          }
      }, [formData.state])
      useEffect(()=>{
          if(editsuccess){
            setTimeout(() => {
              seteditsuccess(false)
            }, 3000);
          }
      },[editsuccess])
      
      function logout(){
          ls("accessToken",null)
          ls("user_id",null)
          history.replace('/login')
      }
    return (
        <div className="mt70  pb-5 ">
             <Header_two name="Edit Profile" ></Header_two>
             { !loading  &&
             <div  >
             <Profilepicedit pic={profilepic} ></Profilepicedit>
             <form className="mt-4 px-2" onSubmit={(event) => handleEdit(event)}>
        <div className="form-group ">
<span ><b>Name</b></span>
    <input defaultValue={user.name}  type="text" className="form-control" required  name="name"  onChange={handleChange}/>
  </div>
<div className="form-group ">
<span><b>Email</b></span>
    <input defaultValue={user.email} type="email" className="form-control" required  name="email"  onChange={handleChange}/>
  </div>
  <div className="form-group ">
<span><b>Description</b></span>
    <textarea defaultValue={user.description} type="email" className="form-control" name="description"  onChange={handleChange}  ></textarea>
  </div>
  <div className="form-group ">
  <span ><b>Address</b></span>
    <input defaultValue={user.address}  type="text" className="form-control" required  name="address"  onChange={handleChange}/>
  </div>
  <div className="form-group">
    <span><b>Country</b></span>
    <input defaultValue={user.country} list="countrylist" type="text" className="form-control" required name="country" onChange={handleChange}/>
    <datalist id="countrylist">
        {Country.map(country =>{
          return <option key={country.id} value={country.name}></option>  
        })}
    </datalist>
  </div>

  <div className="form-group">
    <span><b>State</b></span>
    <input defaultValue={user.state} type="text" list="statelist" className="form-control" required name="state" onChange={handleChange}/>
    <datalist id="statelist">
        {States.map(country =>{
          return <option key={country.id} value={country.name}></option>  
        })}
    </datalist>
  </div>
  {errsave &&
  <span className="text-danger font-weight-bold">Email or Whatsapp number already exists. <br/></span>
}
{ editsuccess && 
  <span className="text-success font-weight-bold">Updated Successfully. <br/></span>
}
  <button type="submit" className="mt-2 btn  btn-primary">
  {loadingsave? <>Loading...</>:<>Save</> } 
  </button>
</form>

<button className="btn btn-block btn-danger mt-5 mb-5" onClick={()=>{logout()}} >Log Out</button>
             </div> }
           {loading&& <Loading></Loading> }
              </div>
    )
}
