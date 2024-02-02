import React from 'react'
import './Preloader.css'

const Preloader = () => {
    return (
        <div className="preloader">
            <div className="preloader__container">
                {/* <span className="preloader__round"></span> */}
                <span className="loader"></span>
            </div>
        </div>
    )
};

export default Preloader
