import React from 'react'
import FeatherIcon from "feather-icons-react"
import { Header_two } from "../components/Header_two";
export const SearchPage = () => {
    return (
        <div>
            <Header_two name="Search" ></Header_two>
            <div className="mt70 text-center" >
                <h2>Under Developement</h2>
                <FeatherIcon icon="github" size={100} ></FeatherIcon>
                <h2>Contribute on GitHub</h2>
                <a className="text-break" href='https://github.com/PraveenSaravanan7/catalogued' target="blank" >https://github.com/PraveenSaravanan7/catalogued</a>
            </div>
        </div>
    )
}
