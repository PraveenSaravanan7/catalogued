import React from 'react'
import './Loading.css'
export const Loading = () => {
    return (
        <div className="loadingdiv" >
            <div className="lodingcenterdiv" >
            <div className="spinner-border text-primary loadingitem " role="status">
  <span className="sr-only">Loading...</span>
</div>
</div>
        </div>
    )
}
