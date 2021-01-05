import React from 'react';
import Gatsby from '../../images/bookcovers-dummy/the great gatsby.svg';
import './book.css';

const book = (props) => (
    <article className="book" onClick={props.clicked}>
        <img src={"http://covers.openlibrary.org/b/isbn/" + props.isbn + "-L.jpg?default=false"} alt="" style={{ width: "60%" }} id="imageBox"/>
        <h1>{props.bookname}</h1>
        <div className="Info">
            <div className="Author">{props.author}</div>
        </div>
    </article>
);

export default book;