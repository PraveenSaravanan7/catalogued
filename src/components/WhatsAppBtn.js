import React from 'react'
import "./WhatsAppBtn.css"
import walogo from "../assets/whatsapp.svg"

export const WhatsAppBtn = (props) => {
    return (
       
            <div className="wabtn" >
                <a  href={"https://wa.me/91"+props.num} target="_blank" >
                    <button className="btn btn-light btn-sm shadow" ><img src={walogo} width="25px"  /> Contact Us</button>
                </a>
            </div>
       
    )
}
