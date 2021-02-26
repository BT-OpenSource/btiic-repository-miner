import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-table/react-table.css";
import "./CodeMetrics.css"

class CodeMetrics extends Component {

    calculateTabs = (javaMetricsColumns, goMetricsColumns, languageMetricsColumns) => {
        let tabs = [];
        let tabpanels = [];

        if (this.props.javafilestats !== undefined && this.props.javafilestats.length > 0) {
            tabs.push(<Tab key="1-JAVA">Java Metrics</Tab>);
           tabpanels.push(<TabPanel key="1-JAVAPANEL"><ReactTable data={this.props.javafilestats} columns={javaMetricsColumns} defaultPageSize={25} className="-striped -highlight"/></TabPanel>);
        }

        if (this.props.gofilestats !== undefined && this.props.gofilestats.length > 0) {
            tabs.push(<Tab key="2-GO">Go Metrics</Tab>);
            tabpanels.push(<TabPanel  key="2-GOPANEL"><ReactTable data={this.props.gofilestats} columns={goMetricsColumns} defaultPageSize={25} className="-striped -highlight"/></TabPanel>);
        }

        if (this.props.cppfilestats !== undefined && this.props.cppfilestats.length > 0) {
          tabs.push(<Tab key="3-CPP">C++ Metrics</Tab>);
          tabpanels.push(<TabPanel  key="3-CPPPANEL"><ReactTable data={this.props.cppfilestats} columns={languageMetricsColumns} defaultPageSize={25} className="-striped -highlight"/></TabPanel>);
        }

        if (this.props.jsfilestats !== undefined && this.props.jsfilestats.length > 0) {
          tabs.push(<Tab key="4-JS">JS Metrics</Tab>);
          tabpanels.push(<TabPanel  key="4-JSPANEL"><ReactTable data={this.props.jsfilestats} columns={languageMetricsColumns} defaultPageSize={25} className="-striped -highlight"/></TabPanel>);
        }

        if (this.props.swiftfilestats !== undefined && this.props.swiftfilestats.length > 0) {
          tabs.push(<Tab key="5-SWIFT">Swift Metrics</Tab>);
          tabpanels.push(<TabPanel  key="5-SWIFTPANEL"><ReactTable data={this.props.swiftfilestats} columns={languageMetricsColumns} defaultPageSize={25} className="-striped -highlight"/></TabPanel>);
        }

        if (this.props.scalafilestats !== undefined && this.props.scalafilestats.length > 0) {
          tabs.push(<Tab key="6-SCALA">Scala Metrics</Tab>);
          tabpanels.push(<TabPanel  key="6-SCALAPANEL"><ReactTable data={this.props.scalafilestats} columns={languageMetricsColumns} defaultPageSize={25} className="-striped -highlight"/></TabPanel>);
        }

        if (this.props.pythonfilestats !== undefined && this.props.pythonfilestats.length > 0) {
          tabs.push(<Tab key="7-PYTHON">Python Metrics</Tab>);
          tabpanels.push(<TabPanel  key="7-PYTHONPANEL"><ReactTable data={this.props.pythonfilestats} columns={languageMetricsColumns} defaultPageSize={25} className="-striped -highlight"/></TabPanel>);
        }

        if (this.props.rubyfilestats !== undefined && this.props.rubyfilestats.length > 0) {
          tabs.push(<Tab key="8-RUBY">Ruby Metrics</Tab>);
          tabpanels.push(<TabPanel  key="8-RUBYPANEL"><ReactTable data={this.props.rubyfilestats} columns={languageMetricsColumns} defaultPageSize={25} className="-striped -highlight"/></TabPanel>);
        }

        if (this.props.phpfilestats !== undefined && this.props.phpfilestats.length > 0) {
          tabs.push(<Tab key="9-PHP">PHP Metrics</Tab>);
          tabpanels.push(<TabPanel  key="9-PHPPANEL"><ReactTable data={this.props.phpfilestats} columns={languageMetricsColumns} defaultPageSize={25} className="-striped -highlight"/></TabPanel>);
        }

        if (this.props.luafilestats !== undefined && this.props.luafilestats.length > 0) {
          tabs.push(<Tab key="10-LUA">LUA Metrics</Tab>);
          tabpanels.push(<TabPanel  key="10-LUAPANEL"><ReactTable data={this.props.luafilestats} columns={languageMetricsColumns} defaultPageSize={25} className="-striped -highlight"/></TabPanel>);
        }

        if (this.props.ttcnfilestats !== undefined && this.props.ttcnfilestats.length > 0) {
          tabs.push(<Tab key="11-TTCN">TTCN Metrics</Tab>);
          tabpanels.push(<TabPanel  key="11-TTCNPANEL"><ReactTable data={this.props.ttcnfilestats} columns={languageMetricsColumns} defaultPageSize={25} className="-striped -highlight"/></TabPanel>);
        }

        if (this.props.ttcn3filestats !== undefined && this.props.ttcn3filestats.length > 0) {
          tabs.push(<Tab key="12-TTCN3">TTCN3 Metrics</Tab>);
          tabpanels.push(<TabPanel  key="12-TTCN3PANEL"><ReactTable data={this.props.ttcn3filestats} columns={languageMetricsColumns} defaultPageSize={25} className="-striped -highlight"/></TabPanel>);
        }

        if (tabs.length > 0 && tabpanels.length > 0) {
            return <Tabs><TabList>{tabs}</TabList>{tabpanels}</Tabs>;
        } else {
            return <h2>No metrics found for supported languages</h2>;
        }
    };

  render() {

    const javaMetricsColumns = [{
        Header: 'File',
        accessor: 'filename' // String-based value accessors!
      }, {
        Header: 'Anonymous Inner Class Length',
        accessor: 'anonInnerLength',
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      }, {
        Header: 'Method Length',
        accessor: 'methodLength',
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      }, {
        Header: 'Nested If Depth',
        accessor: 'nestedIfDepth',
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      }, {
        Header: 'Boolean Expression Complexity',
        accessor: 'booleanExpressionComplexity',
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      }, {
        Header: 'Class Data Abstraction Coupling',
        accessor: 'classDataAbstractionCoupling',
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      }, {
        Header: 'Class Fan Out',
        accessor: 'classFanOutComplexity',
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      }, {
        Header: 'Cyclomatic Complexity',
        accessor: 'cyclomatic_complexity',
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      }]

    const goMetricsColumns = [{
          Header: 'File',
          accessor: 'filename' // String-based value accessors!
        }, {
          Header: 'Cyclomatic Complexity',
          accessor: 'cyclomaticComplexity',
          Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
          Header: 'Duplicated Constant Strings',
          accessor: 'duplicateConstStrings',
          Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }]

    const languageMetricsColumns = [{
        Header: 'File',
        accessor: 'filename' // String-based value accessors!
      }, {
        Header: 'Cyclomatic Complexity',
        accessor: 'cyclomatic_complexity',
      }, {
        Header: 'Number Of Lines',
        accessor: 'num_lines',
      }, {
        Header: 'Tokens',
        accessor: 'num_tokens',
      }]

    let tabwidget = this.calculateTabs(javaMetricsColumns, goMetricsColumns, languageMetricsColumns);

    return (
      <div className="CodeMetrics">
        {tabwidget}
      </div>
    );
  }
}

export default CodeMetrics;
