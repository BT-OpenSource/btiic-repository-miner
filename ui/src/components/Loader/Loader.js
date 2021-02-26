import React, { Component } from 'react';
import "react-table/react-table.css";
import "./Loader.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Loader extends Component {

    render() {

        if (this.props.loading) {
            return (
                <div className="loading">
                    <FontAwesomeIcon icon="spinner" pulse size="4x" />
                </div>
            );
        } else {
            return (
                <div>
                    {this.props.children}
                </div>
            );
        }
    }
}

export default Loader;
