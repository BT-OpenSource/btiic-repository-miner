import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

class Ownership extends Component {
    render() {
      const ownershipColumns = [{
        Header: 'Entity',
        accessor: 'name' // String-based value accessors!
      }, {
        Header: 'Total Number of Revisions',
        accessor: 'total_revisions'
      }, {
        Header: 'Main Developer',
        accessor: 'owner'
      }, {
        Header: 'Developer Revisions',
        accessor: 'owner_revisions',
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      }, {
        Header: 'Percentage',
        accessor: 'owner_percent',
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      }]

      return (
          <div className="Ownership">
          <h2>Ownership</h2>
          <ReactTable data={this.props.ownership} columns={ownershipColumns} defaultPageSize={20} className="-striped -highlight"/>
          </div>
      );
    }
}

export default Ownership;
