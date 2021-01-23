import React from 'react'
import { Link } from 'react-router-dom'

export const GridBox = (props) => {
    var url=props.data.type=="category"?"/category/"+props.data._id:"/product/"+props.data._id
    return (
        <Link to={url}>
        <div className="grid-box" >
            <img className="grid-image" src={props.data.photo} />

            <h5  className="mb-0 " >{props.data.title}</h5>
          
            <span className="text-muted" > {props.data.description} </span>
            {props.data.price &&  <h4 className="mt-1" >₹ {props.data.price}</h4> }
        </div>
        </Link>
    )
}
