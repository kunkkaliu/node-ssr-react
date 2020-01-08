import React from 'react';
import Footer from '../../components/Footer';
import img1 from '../../assets/images/avatar.jpeg';

export default function List(props) {
    const { records = [] } = props;

    return (
        <div className="start-container">
            <p>this is start page!</p>
            <p> hello {records.length}</p>
            <img src={img1} />
            <Footer></Footer>
        </div>
    );
}
