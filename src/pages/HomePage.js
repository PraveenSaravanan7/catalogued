import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from '../api'
import { Header } from "../components/Header";
var worldMapData = require('city-state-country')
const ls=require('local-storage')
export const HomePage = () => {
    
    const history=useHistory()
    var [formData, updateFormData] = useState([]);
    var [loading,setloading]=useState(false);
    var [err,seterr]=useState(false);
    var [Country, updateCountry] = useState([]);
    var [States, updateStates] = useState([]);
    var [tab,settab]=useState(true)
    async function signup() {
        //console.log(formData)
        setloading(true)
        seterr(false)
        try {           
          const response = await axios.post('/users',formData);         
          if(response.data){
            return response.data
          }
          setloading(false)
        } catch (error) {
          seterr(error);
          setloading(false)
        }
      }
    async function login() {
        //console.log(formData)
        setloading(true)
        seterr(false)
        try {           
          const response = await axios.post('/users/login',formData);         
          if(response.data){
            return response.data
          }
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
    function handleSignup(event){
        event.preventDefault();
        signup().then(data =>{
          if(data.accessToken){
          ls("accessToken",data.accessToken);
          ls("user_id",data.user_id);
          history.replace('/');
          }
        })
    }
    function handleLogin(event){
      event.preventDefault();
      login().then(data =>{
        if(data.accessToken){
          console.log(data)
        ls("accessToken",data.accessToken);
        ls("user_id",data.user_id);
        history.replace('/');
        }
      })
  }
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
    return (
        <div>
          <Header login={true}></Header>
          <div className="mt70 pt-4 pb-5" >
              <h1 className="" >Online catalog for your products</h1>
             <div className="tab-bg mt-2 p-1" >
               
                 <button  className={tab?"btn btn-primary":"btn btn-light bg-white"}  onClick={ ()=>{settab(true)}} >SignUp</button>
                 <button className={!tab?"btn btn-primary ml-2":"btn btn-light bg-white ml-2"} onClick={ ()=>{settab(false)}} >LogIn</button>
                
                </div> 
      {tab?
            <form className="mt-4 px-2" onSubmit={(event) => handleSignup(event)}>
        <div className="form-group ">
<span ><b>Shop Name</b></span>
    <input type="text" className="form-control" required  name="name"  onChange={handleChange}/>
  </div>
<div className="form-group ">
<span><b>Email</b></span>
    <input type="email" className="form-control" required  name="email"  onChange={handleChange}/>
  </div>
  <div className="form-group ">
<span><b>WhatsApp number</b></span>
    <input type="number" className="form-control" required  name="whatsapp"  onChange={handleChange}/>
  </div>
  <div className="form-group">
    <span  ><b>Password</b></span>
    <input type="password" className="form-control" required name="password" onChange={handleChange}/>
  </div>
  <div className="form-group">
    <span  ><b>Address</b></span>
    <input type="text" className="form-control" required name="address" onChange={handleChange}/>
  </div>
  <div className="form-group">
    <span><b>Country</b></span>
    <input list="countrylist" type="text" className="form-control" required name="country" onChange={handleChange}/>
    <datalist id="countrylist">
        {Country.map(country =>{
          return <option key={country.id} value={country.name}></option>  
        })}
    </datalist>
  </div>

  <div className="form-group">
    <span><b>State</b></span>
    <input type="text" list="statelist" className="form-control" required name="state" onChange={handleChange}/>
    <datalist id="statelist">
        {States.map(country =>{
          return <option key={country.id} value={country.name}></option>  
        })}
    </datalist>
  </div>
  {err &&
  <span className="text-danger font-weight-bold">Email or WhatsApp number already exists try to log in. <br/></span>
}
  <button type="submit" className="mt-2 btn  btn-dark">
  {loading? <>Loading...</>:<>Submit</> } 
  </button>
</form>
      :  
<form className="mt-4 px-2" onSubmit={(event) => handleLogin(event)}>      
<div className="form-group ">
<span><b>Email</b></span>
  <input type="email" className="form-control" required  name="email"  onChange={handleChange}/>
</div>
<div className="form-group">
  <span  ><b>Password</b></span>
  <input type="password" className="form-control" required name="password" onChange={handleChange}/>
</div>
{err &&
<span className="text-danger font-weight-bold">Incorrect Email or Password. <br/></span>
}
<button type="submit" className="mt-2 btn  btn-dark">
{loading? <>Loading...</>:<>Submit</> } 
</button>
</form>
   }
          </div>
        </div>
    )
}
