import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

class Hotspots extends Component {
  render() {

    const hotspotColumns = [{
      Header: 'Entity',
      accessor: 'name' // String-based value accessors!
    }, {
      Header: 'Number of Revisions',
      accessor: 'commits',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }]

    return (
      <div className="Hotspots">
        <h2>Code Hotspots</h2>
        <ReactTable data={this.props.revisions} columns={hotspotColumns} defaultPageSize={20} className="-striped -highlight" />
      </div>
    );
  }
}

export default Hotspots;
