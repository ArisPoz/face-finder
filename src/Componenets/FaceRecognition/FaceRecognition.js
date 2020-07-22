import React from 'react';
import './FaceRecognition.css'

const FaceRecongition = ({ box, imageUrl }) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='' src={imageUrl} width='400px' height='auto'/>
                <div className='bounding-box' style={{top: box.topRow, right: box.rightColumn, left: box.leftColumn, bottom: box.bottomRow}}></div>
            </div>
        </div>
    );
}

export default FaceRecongition;