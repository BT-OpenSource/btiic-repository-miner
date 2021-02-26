import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import Doughnut from 'react-chartjs-2';
import "./Overview.css";

class Overview extends Component {
  render() {
    const repoData = [{
      metric: 'Lines of Code',
      value: this.props.loc
    }, {
      metric: 'Number of Files',
      value: this.props.files
    }, {
      metric: 'Number of Active Developers',
      value: this.getDeveloperNumber()
    }]

    const repoColumns = [{
      Header: 'Metric',
      accessor: 'metric' // String-based value accessors!
    }, {
      Header: 'Value',
      accessor: 'value',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }]

    const languageColumns = [{
      Header: 'Language',
      accessor: 'name' // String-based value accessors!
    }, {
      Header: 'Lines of Code',
      accessor: 'loc',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      Header: 'Number of Files',
      accessor: 'numfiles',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }]

    return (

      <div className="Overview">
        <h2>Repository Overview</h2>
        <ReactTable data={repoData} columns={repoColumns} defaultPageSize={3} className="-striped -highlight" />
        <h2>Individual Language Metrics</h2>
        <ReactTable data={this.props.breakdown} columns={languageColumns} defaultPageSize={10} className="-striped -highlight" />
        <h2>Language Breakdown Charts</h2>
        <div className="Charts">
          <span className="FileBreakdown">
            <h3>Files</h3>
            {this.props.breakdown && <Doughnut className="Doughnut" data={this.fileBreakdown(this.props.breakdown)} />}
          </span>
          <span className="LineBreakdown">
            <h3>Lines of Code</h3>
            {this.props.breakdown && <Doughnut className="Doughnut" data={this.linesBreakdown(this.props.breakdown)} />}
          </span>
        </div>

      </div>
    );
  }

  fileBreakdown = (json) => {
    let labelArray = [];
    let dataArray = [];
    let backgroundColourArray = [];
    let hoverBackgroundColourArray = [];

    Object.values(json).forEach(value => {
      labelArray.push(value.name);
      dataArray.push(value.numfiles);
      //TODO this breaks tests for equality
      let colour = this.getRandomColour();
      backgroundColourArray.push(colour);
      hoverBackgroundColourArray.push(colour);
    });

    return {
      labels: labelArray,
      datasets: [{
        data: dataArray,
        backgroundColor: backgroundColourArray,
        hoverBackgroundColor: hoverBackgroundColourArray
      }]
    };
  }

  linesBreakdown = (json) => {
    let labelArray = [];
    let dataArray = [];
    let backgroundColourArray = [];
    let hoverBackgroundColourArray = [];

    Object.values(json).forEach(value => {
      labelArray.push(value.name);
      dataArray.push(value.loc);
      let colour = this.getRandomColour();
      backgroundColourArray.push(colour);
      hoverBackgroundColourArray.push(colour);
    });

    return {
      labels: labelArray,
      datasets: [{
        data: dataArray,
        backgroundColor: backgroundColourArray,
        hoverBackgroundColor: hoverBackgroundColourArray
      }]
    };
  }

  getRandomColour() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getDeveloperNumber() {
    if (this.props.developers !== undefined) {
      return '' + this.props.developers.length;
    }
  }
}

export default Overview;
