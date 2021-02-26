import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

class Complexity extends Component {
    render() {

      const complexityColumns = [{
        Header: 'Entity',
        accessor: 'name' // String-based value accessors!
      }, {
        Header: 'Mean Spaces',
        accessor: 'meanSpaces',
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      }, {
        Header: 'Max Spaces',
        accessor: 'maxSpaces',
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      }]

      return (
          <div className="Complexity">
          <h2>Complexity</h2>
          <ReactTable data={this.props.spaceComplexity} columns={complexityColumns} defaultPageSize={20} className="-striped -highlight"/>
          </div>
      );
    }
}

export default Complexity;
