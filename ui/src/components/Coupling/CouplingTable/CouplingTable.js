
import React, { Component } from 'react';
import ReactTable from 'react-table';

class CouplingTable extends Component {
    state = {  }

    getTrProps(state, rowInfo) {
        return {
            onClick: () => {
                this.props.setSelectedNode(rowInfo.row['node.filename']);
            }
        }
    }

    render() { 

        const couplingColumns = [{
            Header: 'File Name',
            accessor: 'node.filename' // String-based value accessors!
          }, {
            Header: 'Number of Edges',
            accessor: 'edges.length',
        }];

        return (
            <ReactTable getTrProps={this.getTrProps.bind(this)} data={this.props.nodeList} columns={couplingColumns} defaultPageSize={20} className="-striped -highlight"/>
         );
    }
}
 
export default CouplingTable;