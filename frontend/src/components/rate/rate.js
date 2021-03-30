import React from 'react';
import './rate.css';

const rate = (props) => (
    <article>
        <p className="rate">{props.rate}</p>
        <div className="User">{props.user}</div>
        
    </article>
);

export default rate;