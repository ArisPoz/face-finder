import React from 'react';
import Tilt from 'react-tilt';
import img from './logo.png';
import './Logo.css';

const Logo = () => {
    return(
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 35 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner pa3">
                    <img src={img} alt='Logo'/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;