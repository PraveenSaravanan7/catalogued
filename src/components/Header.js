import React from 'react'
import "./Header.css"
import logo from "../assets/logo.svg";
import logo_g from "../assets/logo_grid.svg";
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
export const Header = (props) => {
    return (
        <div className=" header p-2 px-3">     
                {props.login? <span >  <img src={logo} height={50} /></span>:
            <> 
            <img src={logo_g} height={40} /> 
            <span className="float-right pt-2" > 
            <Link to={"/search"} >
            <FeatherIcon icon="search" color="black" className="mr-3" ></FeatherIcon>  
            </Link>
            <Link to={"/favorite"} >
            <FeatherIcon icon="heart" color="black" className="mr-0" ></FeatherIcon>  
            </Link>
            </span> 
            </> }
        </div>
    )
}
