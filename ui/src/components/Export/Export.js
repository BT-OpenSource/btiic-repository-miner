import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import './Export.css';
const { Parser } = require('json2csv');

class Export extends Component {
    constructor(props) {
        super(props)
        this.state = {
            metrics: this.props.collectedMetrics,
            repoName: this.props.repoName,
            languageOption: 'all',
            metricOptions: []
        }
    }

    componentDidMount = () => {
        this.generateLanguageOptions();
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps !== this.props) {
            this.generateLanguageOptions();
        }
    }

    generateLanguageOptions = () => {
        const metricOptions = [];
        for (let language in this.state.metrics) {
            if (this.state.metrics[language][0]) {
                metricOptions.push({ key: language, value: language })
            }
        }
        this.setState({ metricOptions: metricOptions })
    }

    handleDownloadMetrics = () => {
        this.setMetricCSV(this.state.languageOption)
    }

    downloadCsv = (csv, fileName) => {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
        element.setAttribute('download', fileName);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    handleOptionChange = ({ target }) => {
        this.setState({
            languageOption: target.value
        })
    }

    setMetricCSV = () => {
        const allResults = Object.assign({}, this.state.metrics);
        const allMetrics = [];
        for (let language in allResults) {
            if (allResults[language] && allResults[language].length > 0) {
                for (let key in allResults[language][0]) {
                    if (allMetrics.indexOf(key) === -1) {
                        allMetrics.push(key);
                    }
                }
            }
        }

        let dataJson = this.getMetricResults(allResults, allMetrics, this.state.languageOption);
        let json2csvParser = new Parser({ dataJson });
        let csv = json2csvParser.parse(dataJson);
        this.setState({ allMetricsCsv: csv });
        this.downloadCsv(csv, `${this.state.repoName}-metrics.csv`)
    }

    getMetricResults = (allResults, allMetrics, language) => {
        const dataForDownload = [];
        if (this.state.languageOption === 'all') {
            for (let eachLanguage in allResults) {
                for (let i = 0; i < allResults[eachLanguage].length; i++) {
                    const newResult = {};
                    allMetrics.forEach((property) => {
                        let result = allResults[eachLanguage][i][property] !== undefined ? allResults[eachLanguage][i][property] : "n/a";
                        newResult["language"] = eachLanguage;
                        newResult[property] = result;
                    });
                    dataForDownload.push(newResult);
                }
            }
        } else {
            for (let i = 0; i < allResults[language].length; i++) {
                const newResult = {};
                allMetrics.forEach((property) => {
                    let result = allResults[language][i][property] !== undefined ? allResults[language][i][property] : "n/a";
                    newResult["language"] = language;
                    newResult[property] = result;
                    console.log('newResult', newResult)
                });
                dataForDownload.push(newResult);
                console.log("dataForDownload", dataForDownload)
            }
        }

        return dataForDownload;
    }


    render() {
        return (
            <div className='modal'>
                <header className="modal-header">
                    <h2>Export Options</h2>
                </header>
                <section className="modal-main">
                    <p>Please select which language metrics to download</p>
                    <select
                        className='modal-select'
                        defaultValue={this.state.languageOption}
                        onChange={this.handleOptionChange}>
                        <option value="all">All Languages</option>
                        {this.state.metricOptions.map(options => <option key={options.key} value={options.value}>{options.value}</option>)}
                    </select>
                </section>
                <section className='modal-footer'>
                    <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={this.props.onCancel}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={this.handleDownloadMetrics}>Download Metrics</Button>
                </section >
            </div >)
    }
}

export default Export