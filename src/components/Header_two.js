import React from 'react'
import './Header.css'
import FeatherIcon from 'feather-icons-react'
import { useHistory } from 'react-router-dom'
export const Header_two= (props)=> {
    const history=useHistory()
    function goback(){
        history.go(-1)
    }
    return (      
        <div>
        <div className="header p-2 px-2" >        
        <span  className=" headtwo h5">
        <FeatherIcon  onClick={goback} icon="chevron-left" color="black"></FeatherIcon>  <b> {props.name}</b>
        </span>
      
        </div>
        </div>
    )
}
