import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../../components/Footer';

export default class Start extends React.Component {
    static propTypes = {
        name: PropTypes.string,
    };

    render() {
        const { name } = this.props;
        return (
            <div className="start-container">
                <p>this is start page!</p>
                <p> hello {name}</p>
                <Footer></Footer>
            </div>
        );
    }
}
