import React from 'react';
import './Stars.css';

const Stars = (props) => {
    const ratingStyle = {
        width: props.rating*13.1,
    };
    return(
        <div className="star-ratings">
            <div className="star-ratings-top" style={ratingStyle}>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
            </div>
            <div className="star-ratings-bottom">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
            </div>
        </div>
    )
};

export default Stars;
