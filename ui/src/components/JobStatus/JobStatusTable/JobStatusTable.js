import React, { Component } from 'react';
import ReactTable from 'react-table';
var moment = require('moment');

class JobStatusTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curTime: moment()

        }
    }


    componentDidMount() {
        setInterval(() => {
            this.setState({
                curTime: moment()
            })
        }, 1000)
    }

    getElapsedTime(startTime, finishedTime) {

        let elapsedTime = "00:00"

        if (finishedTime) {
            let difference = moment.duration(finishedTime.diff(startTime));
            elapsedTime = moment.utc(difference.as('milliseconds')).format('mm:ss')
        } else {
            let difference = moment.duration(this.state.curTime.diff(startTime));
            elapsedTime = moment.utc(difference.as('milliseconds')).format('mm:ss')
        }

        return elapsedTime

    }

    getTrProps = (state, rowInfo) => {
        if (rowInfo) {
            return {
                style: {
                    background: rowInfo.row.status === "Running" ? "yellow" : (rowInfo.row.status === "Completed" ? "#02c202" : (rowInfo.row.status === "Error" ? "red" : "")),
                    color: rowInfo.row.status === "Running" ? "black" : (rowInfo.row.status === "Completed" ? "white" : (rowInfo.row.status === "Error" ? "white" : "")),
                    textAlign: "center"
                }
            }
        }
        return {};
    }



    render() {

        let tableColumns = [
            { Header: "Name", accessor: "name" },
            { Header: "Status", accessor: "status" },
            {
                Header: "Started", accessor: "startTime",
                Cell: props => <span className='number'>{moment(props.value).toISOString()}</span>
            },
            {
                Header: "Finished", accessor: "finishedTime",
                Cell: props => <span className='number'>{props.value ? moment(props.value).toISOString() : null}</span>
            },
            {
                id: 'elapsedTime',
                Header: "Elapsed",
                accessor: row => this.getElapsedTime(row.startTime, row.finishedTime)
            }
        ]
        return (
            <ReactTable data={this.props.activeCalls} columns={tableColumns} defaultPageSize={25} className="-striped -highlight" getTrProps={this.getTrProps} />
        );
    }
}


export default JobStatusTable;