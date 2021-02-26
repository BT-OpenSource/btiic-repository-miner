import React, { Component } from 'react';
import CouplingTable from './CouplingTable/CouplingTable';
import Graph from 'react-graph-vis';
import IconButton from '@material-ui/core/IconButton';
import BarChartIcon from '@material-ui/icons/BarChart';
import TableChartIcon from '@material-ui/icons/TableChart';

import './Coupling.css'

class Coupling extends Component {

  state = {
    showTable: true,
    selectedNode: undefined,
  }

  render() {
    return (
      <div className="Coupling">
        <div className="inline-div">
          <h1 className="coupling-header">Coupling</h1>
          <IconButton color="primary" onClick={this.showTable}>{this.getIcon()}</IconButton>
        </div>
        {this.getComponent()}
      </div>
    );
  }

  getOptions = () => {
    return {
      layout: {
        hierarchical: false
      }
    };
  }

  getEvents = () => {
    return {
      stablized: function (event) {
        var { iterations } = event;
        console.log(iterations);
      }
    };
  }

  /**
   * Function that will return an object containing coupling nodes and edges. If there is a selected node
   * it will only return edges for that node. If no selected node it will return all edges.
   */
  getCouplingData = () => {
    const nodes = this.getNodes()
    if (this.state.selectedNode) {
      const edges = this.getEdgesForNode(this.state.selectedNode);
      const nodesWithEdges = nodes.filter((node) => {
        return !!edges.find(edge => edge.from === node.title || edge.to === node.title);
      });
      return { nodes: nodesWithEdges, edges: this.getEdgesForNode(this.state.selectedNode) }
    } else {
      return { nodes: nodes, edges: this.getEdges() };
    }
  }

  getNode(filename) {
    return this.props.coupling.nodes.find((node) => node.filename === filename);
  }

  /**
   * Function that will return an array of node objects created using coupling response nodes.
   */
  getNodes = () => {
    let nodes = [];

    if (this.props.coupling.nodes !== undefined) {
      this.props.coupling.nodes.forEach(item =>
        nodes.push({ id: item.filename, label: item.name, color: "#ffbd54", title: item.filename })
      )
    }

    return nodes;
  }

  /**
   * Function that will return an array of edge objects created using coupling response edges.
   */
  getEdges = () => {
    let edges = [];
    if (this.props.coupling.edges !== undefined) {
      this.props.coupling.edges.forEach(item =>
        edges.push({ arrows: { to: { enabled: false }, from: { enabled: false } }, from: item.edge[0], to: item.edge[1], color: "#302e2c", title: "Weight: " + item.weight + "  Percent: " + item.percent })
      )
    }

    return edges;
  }

  /**
   * Function that will return an array of all edges the reference a designated node.
   * @param node Node object for which there are edges.
   */
  getEdgesForNode = (node) => {
    let edges = [];
    if (this.props.coupling.edges !== undefined) {
      this.props.coupling.edges.forEach(item => {
        if (item.edge[0] === node || item.edge[1] === node) {
          edges.push({ arrows: { to: { enabled: false }, from: { enabled: false } }, from: item.edge[0], to: item.edge[1], color: "#302e2c", title: "Weight: " + item.weight + "  Percent: " + item.percent })
        }
      });
    }
    return edges;
  }

  getComponent = () => {
    if (this.state.showTable) {
      return <CouplingTable nodeList={this.getNodeTable()} setSelectedNode={this.setSelectedNode.bind(this)} />
    } else {
      return <Graph graph={this.getCouplingData()} options={this.getOptions()} events={this.getEvents()} style={{ height: "640px" }} />;
    }
  }

  getIcon = () => {
    return this.state.showTable ? <BarChartIcon /> : <TableChartIcon />
  }

  getNodeTable = () => {
    const nodes = this.props.coupling.nodes;
    const nodeList = [];

    nodes.forEach((nodeObj) => {
      const edges = this.props.coupling.edges.filter((edgeObj) => {
        return edgeObj.edge.includes(nodeObj.filename);
      });

      nodeList.push({ node: nodeObj, edges: edges });
    });

    return nodeList;
  }

  showTable = () => {
    this.setState({ showTable: !this.state.showTable, selectedNode: undefined })
  }

  setSelectedNode(node) {
    this.setState({ selectedNode: node, showTable: false });
  }
}

export default Coupling;
