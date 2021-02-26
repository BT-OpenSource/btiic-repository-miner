import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import Overview from '../Overview/Overview';
import Hotspots from '../Hotspots/Hotspots';
import Complexity from '../Complexity/Complexity';
import Coupling from '../Coupling/Coupling';
import Ownership from '../Ownership/Ownership';
import CodeMetrics from '../CodeMetrics/CodeMetrics';
import Export from '../Export/Export'
import Backdrop from '../Export/Backdrop/Backdrop'
import Loader from '../Loader/Loader';
import uuidv4 from 'uuid/v4';

import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import WarningIcon from '@material-ui/icons/Warning';

import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

import './MetricTabs.css';

// Font Awesome loading
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import JobStatusButton from '../JobStatus/JobStatusButton/JobStatusButton';
library.add(faSpinner);
library.add(faSyncAlt);

var gh = require('parse-github-url');
var moment = require('moment');

class MetricTabs extends Component {

    state = {
        name: '',
        loc: '',
        files: '',
        breakdown: [],
        javafilestats: [],
        gofilestats: [],
        cppfilestats: [],
        jsfilestats: [],
        swiftfilestats: [],
        scalafilestats: [],
        pythonfilestats: [],
        rubyfilestats: [],
        phpfilestats: [],
        luafilestats: [],
        ttcnfilestats: [],
        ttcn3filestats: [],
        log: [],
        uniqueFiles: [],
        revisions: [],
        developers: undefined,
        spaceComplexity: [],
        ownership: [],
        coupling: [],
        state: 'Ready',

        requestId: '',
        inflightRequests: {},

        activeCalls: [],
        processCallsInitiated: false,
        showWarning: false,
        showExport: false,
        showDownload: false
    }

    componentDidMount() {
        this.onInit(this.props.submitEvent);
    }

    /**
     * Funtion that will post stringified body object "newObject" to designated URL
     * @param url api url.
     * @param newObject body object to be posted.
     */
    async postJSON(url, newObject) {
        try {
            let response = await fetch(url, {
                method: "post",
                headers: new Headers({
                    //"content-type": "application/json; charset=utf-8"
                }),
                body: JSON.stringify(newObject)
            });

            if (response.status !== 200) {
                throw new Error('ApplicationError: Failed to create the entity, response code: ' + response.status)
            }

            return response.json();

        } catch (error) {
            throw error;
        }
    }

    /**
     * Function used to queue up a request to the repominer callback queue.
     * Function will create a promise for the request and add it to the inflight requests array.
     * @param function_name Name of the function to be queued up.
     * @param data Data to be posted.
     * @param request_id Unique id used to identify request.
     * @param language Used by git-language-metrics to specify language to collect metrics for.
     */
    asyncRequest(function_name, data, request_id, language) {

        if (language) {
            request_id = request_id + "-" + language
        }

        let callbackKey = '/' + request_id + '/' + function_name;

        let reqPromise = new Promise((resolve, reject) => {
            let promObject = {};
            promObject[callbackKey] = {
                resolve: resolve,
                reject: reject
            }
            let requests = Object.assign(this.state.inflightRequests, promObject);
            this.setState({ inflightRequests: requests })
            this.props.inflightRequests(requests);
        });

        fetch(process.env.REACT_APP_RESEARCHAPI_GATEWAY_ASYNC_ENDPOINT, {
            method: "post",

            body: JSON.stringify({
                requestId: request_id,
                clientId: this.props.socketId,
                functionName: function_name,
                data: data
            })
        }).then((response) => {
            if (response.status < 200 || response.status > 299) {
                this.state.inflightRequests[function_name].reject();
                throw new Error('ApplicationError: Failed to create the entity, response code: ' + response.status + '. ' + response.statusText);
            }
        }).catch((error) => {
            throw error;
        })
        return reqPromise;
    }

    /**
     * Synchronous function used to queue up a request to the repominer callback queue.
     * Function will create a promise for the request and add it to the inflight requests array.
     * @param function_name Name of the function to be queued up.
     * @param data Data to be posted.
     * @param request_id Unique id used to identify request.
     */
    async syncRequest(function_name, data) {
        try {
            let reqPromise = fetch(process.env.REACT_APP_RESEARCHAPI_GATEWAY_SYNC_ENDPOINT + function_name, {
                method: "post",
                body: JSON.stringify(data)
            })
            await reqPromise;
            return reqPromise;
        } catch (error) {
            console.log(error);
        }

    }

    showExportMenu = () => {
        this.setState({ showExport: true });
        console.log("DOWNLOAD METRICS", this.state.metricsReply)
    }

    closeExportMenu = () => {
        this.setState({ showExport: false });
    }

    render() {
        const status = `${this.state.status}:  ${this.state.name}`
        const LoadingIcon = this.getIcon();
        this.isDone();

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <img src={require('../../assets/beta-logo.png')} className="beta-logo" alt="" />
                        {LoadingIcon}
                        <Typography variant="h6" color="inherit" align="center">
                            {status}
                        </Typography>
                        <JobStatusButton activeCalls={this.state.activeCalls} gitMode={this.state.gitMode} />
                        <Button className="repeat-button" variant="outlined" color="secondary" onClick={this.props.return}>Select New Repository</Button>
                        {this.state.showDownload && <Button className="repeat-button" variant="outlined" color="secondary" onClick={this.showExportMenu}>Download Metrics</Button>}
                        {this.state.showExport && <Backdrop />}
                        {this.state.showExport && <Export title='Download Options' onCancel={this.closeExportMenu} collectedMetrics={this.state.metricsReply} repoName={this.state.repoName}>
                        </Export>}

                    </Toolbar>
                </AppBar>
                <Tabs className={"main-tabs-" + (this.state.showWarning ? 'warn' : 'clear')}>
                    <TabList>
                        <Tab key="1-Overview">Overview</Tab>
                        <Tab key="2-Hotspots">Hotspots</Tab>
                        <Tab key="3-Complexity">Complexity</Tab>
                        <Tab key="4-Coupling">Coupling</Tab>
                        <Tab key="5-Ownership">Ownership</Tab>
                        <Tab key="6-Metrics">Code Metrics</Tab>
                    </TabList>

                    <TabPanel>
                        <Loader loading={(this.state.loc === undefined || this.state.files === undefined || this.state.breakdown === undefined || this.state.developers === undefined)}>
                            <Overview loc={this.state.loc} files={this.state.files} breakdown={this.state.breakdown} developers={this.state.developers} />
                        </Loader>
                    </TabPanel>
                    <TabPanel>
                        <Loader loading={(this.state.revisions === undefined)}>
                            <Hotspots revisions={this.state.revisions} />
                        </Loader>
                    </TabPanel>
                    <TabPanel>
                        <Loader loading={(this.state.spaceComplexity === undefined)}>
                            <Complexity spaceComplexity={this.state.spaceComplexity} />
                        </Loader>
                    </TabPanel>
                    <TabPanel>
                        <Loader loading={(this.state.coupling === undefined)}>
                            <Coupling coupling={this.state.coupling} />
                        </Loader>
                    </TabPanel>
                    <TabPanel>
                        <Loader loading={(this.state.ownership === undefined)}>
                            <Ownership ownership={this.state.ownership} />
                        </Loader>
                    </TabPanel>
                    <TabPanel>
                        <Loader loading={(this.state.javafilestats === undefined) && (this.state.gofilestats === undefined) && (this.state.metricsReply === undefined)}>
                            <CodeMetrics javafilestats={this.state.javafilestats} gofilestats={this.state.gofilestats} cppfilestats={this.state.cppfilestats} jsfilestats={this.state.jsfilestats} swiftfilestats={this.state.swiftfilestats} scalafilestats={this.state.scalafilestats} pythonfilestats={this.state.pythonfilestats} rubyfilestats={this.state.rubyfilestats} phpfilestats={this.state.phpfilestats} luafilestats={this.state.luafilestats} ttcnfilestats={this.state.ttcnfilestats} ttcn3filestats={this.state.ttcn3filestats} />
                        </Loader>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }

    /**
     * Function that takes in a request body and a string. The function will replace all
     * occurences of a users username and password with * and return the result.
     * @param body Request body object container user and password.
     * @param string String in which data should be hidden.
     */
    starConfidentialData(body, string) {
        let query;
        if (body.user !== '' && body.password !== '') {
            query = RegExp(`${body.password}|${body.user}`, 'g');
        } else if (body.user !== '') {
            query = RegExp(`${body.user}`, 'g');
        } else if (body.password !== '') {
            query = RegExp(`${body.password}`, 'g');
        } else {
            return string;
        }

        return string.replace(query, "****");
    }

    /**
     * Function that will start the metrics collection process. Using git-s3-store it will 
     * determine if user credentials are valid. If so the metrics collection processes will be 
     * started. If not an error will be thrown and the user will be returned to the repo input.
     * @param event Event object containing target repo url, username and password.
     */
    onInit = async (event) => {
        event.preventDefault();
        this.initState();

        const url = event.target.url.value;
        const userName = event.target.user.value;
        const passwd = event.target.password.value;
        const git_mode = event.target.repoType.value === 'true';

        console.log('git_mode: ', git_mode)

        this.setState({ name: url, gitMode: git_mode })

        // Generate a new request id and store this so that we can keep track of
        // the process via the callbacks

        const requestId = this.rotateRequestId();

        const body = this.generateBody(url, userName, passwd, requestId, git_mode);

        const repoStoreBody = JSON.parse(JSON.stringify(body));
        repoStoreBody.stage = 'init';

        try {
            git_mode ?
                this.startGitMetricsCollection(repoStoreBody, requestId, body)
                :
                this.startSVNMetricCollection(body, requestId)

        } catch (e) {
            console.log('Exception: ', e)
            this.setState({ showWarning: true })
        }
    }

    startSVNMetricCollection(body, requestId) {
        this.setState({ status: 'Collecting Metrics', processCallsInitiated: true }, () => {
            this.startMetricCollection(body, requestId, false);
            this.startLogDependantCalls(body, requestId, false);
        });
    }

    async startGitMetricsCollection(repoStoreBody, requestId, body) {
        let repoStoreReply;
        if (process.env.REACT_APP_ASYNC_MODE === 'true') {
            repoStoreReply = await this.asyncRequestAndProcessResults("store",
                process.env.REACT_APP_BTIIC_SERVICES_GIT_REPO_STORE,
                repoStoreBody, requestId, this.processResults);
        } else {
            repoStoreReply = await this.syncRequestAndProcessResults("store",
                process.env.REACT_APP_BTIIC_SERVICES_GIT_REPO_STORE,
                repoStoreBody, requestId, this.processResults);
        }
        if (repoStoreReply.result !== "success") {
            const starredReply = this.starConfidentialData(body, repoStoreReply.result)
            this.props.updateError(starredReply);
        } else {
            this.setState({ status: 'Collecting Metrics', processCallsInitiated: true }, async () => {
                await this.startMetricCollection(body, requestId, true);
                if (process.env.REACT_APP_ASYNC_MODE === 'true') {
                    this.startAsyncLogDependantCalls(body, requestId, true);
                } else {
                    await this.startSyncLogDependantCalls(body, requestId, true);
                }
            });
        }
    }


    /**
     * Function that will collect all metrics that have a dependancy on git-json-log
     * @param body Request body to be posted.
     * @param requestId Unique generated request id.
     */
    startAsyncLogDependantCalls = async (body, requestId, gitMode) => {
        const jsonUrl = gitMode ? process.env.REACT_APP_BTIIC_SERVICES_GIT_JSON_LOG : process.env.REACT_APP_BTIIC_SERVICES_SVN_JSON_LOG;
        const jsonLogReply = await this.asyncRequestAndProcessResults("log",
            jsonUrl, body, requestId, this.processResults);

        const clocUrl = gitMode ? process.env.REACT_APP_BTIIC_SERVICES_GIT_CLOC : process.env.REACT_APP_BTIIC_SERVICES_CLOC;
        const clocReply = await this.asyncRequestAndProcessResults("cloc",
            clocUrl, body, requestId, this.processCloc);

        const uniqueFiles = await this.asyncRequestAndProcessResults("uniqueFiles",
            process.env.REACT_APP_BTIIC_SERVICES_UNIQUE_FILES,
            { svnLog: jsonLogReply.result, clocOutput: clocReply.result },
            requestId, this.processResults, "unique_files");


        this.asyncRequestAndProcessResults("developers",
            process.env.REACT_APP_BTIIC_SERVICES_DEVELOPER_INFO,
            { svnLog: jsonLogReply.result },
            requestId, this.processResults, "developers");


        this.asyncRequestAndProcessResults("breakdown",
            process.env.REACT_APP_BTIIC_SERVICES_LANGUAGE_BREAKDOWN,
            clocReply.result, requestId, this.processBreakdown);

        this.asyncRequestAndProcessResults("ownership",
            process.env.REACT_APP_BTIIC_SERVICES_OWNERSHIP_INFO,
            { svnLog: jsonLogReply.result, uniqueFiles: uniqueFiles.unique_files },
            requestId, this.processResults, "", true);

        const revisions = await this.asyncRequestAndProcessResults("revisions",
            process.env.REACT_APP_BTIIC_SERVICES_REVISION_ANALYSER,
            { svnLog: jsonLogReply.result, uniqueFiles: uniqueFiles.unique_files },
            requestId, this.processResults, "", true);

        this.asyncRequestAndProcessResults("coupling",
            process.env.REACT_APP_BTIIC_SERVICES_COUPLING_INFO,
            { svnLog: jsonLogReply.result, uniqueFiles: uniqueFiles.unique_files, revisionCounts: revisions },
            requestId, this.processResults, "", true);
    }


    /**
     * Function that will collect all metrics that have a dependancy on git-json-log
     * @param body Request body to be posted.
     * @param requestId Unique generated request id.
     */
    startSyncLogDependantCalls = async (body, requestId, gitMode) => {
        const jsonUrl = gitMode ? process.env.REACT_APP_BTIIC_SERVICES_GIT_JSON_LOG : process.env.REACT_APP_BTIIC_SERVICES_SVN_JSON_LOG;
        const jsonLogReply = await this.syncRequestAndProcessResults("log",
            jsonUrl, body, requestId, this.processResults);

        const clocUrl = gitMode ? process.env.REACT_APP_BTIIC_SERVICES_GIT_CLOC : process.env.REACT_APP_BTIIC_SERVICES_CLOC;
        const clocReply = await this.syncRequestAndProcessResults("cloc",
            clocUrl, body, requestId, this.processCloc);

        const uniqueFiles = await this.syncRequestAndProcessResults("uniqueFiles",
            process.env.REACT_APP_BTIIC_SERVICES_UNIQUE_FILES,
            { svnLog: jsonLogReply.result, clocOutput: clocReply.result },
            requestId, this.processResults, "unique_files");


        await this.syncRequestAndProcessResults("developers",
            process.env.REACT_APP_BTIIC_SERVICES_DEVELOPER_INFO,
            { svnLog: jsonLogReply.result },
            requestId, this.processResults, "developers");


        await this.syncRequestAndProcessResults("breakdown",
            process.env.REACT_APP_BTIIC_SERVICES_LANGUAGE_BREAKDOWN,
            clocReply.result, requestId, this.processBreakdown);

        await this.syncRequestAndProcessResults("ownership",
            process.env.REACT_APP_BTIIC_SERVICES_OWNERSHIP_INFO,
            { svnLog: jsonLogReply.result, uniqueFiles: uniqueFiles.unique_files },
            requestId, this.processResults, "", true);

        const revisions = await this.syncRequestAndProcessResults("revisions",
            process.env.REACT_APP_BTIIC_SERVICES_REVISION_ANALYSER,
            { svnLog: jsonLogReply.result, uniqueFiles: uniqueFiles.unique_files },
            requestId, this.processResults, "", true);

        await this.syncRequestAndProcessResults("coupling",
            process.env.REACT_APP_BTIIC_SERVICES_COUPLING_INFO,
            { svnLog: jsonLogReply.result, uniqueFiles: uniqueFiles.unique_files, revisionCounts: revisions },
            requestId, this.processResults, "", true);
    }

    /**
     * Function that will begin language metrics collection.
     * @param body Request body to be posted.
     * @param requestId Uniquely generated request id.
     * @param git_mode boolean determining if git or svn metric collection should be used.
     */
    startMetricCollection = async (body, requestId, git_mode) => {
        if (git_mode) {
            if (process.env.REACT_APP_ASYNC_MODE === 'true') {
                this.asyncRequestAndProcessResults("javafilestats", process.env.REACT_APP_BTIIC_SERVICES_GIT_TOXICITY_CHECKER, body, requestId, this.processResults);
                this.asyncRequestAndProcessResults("gofilestats", process.env.REACT_APP_BTIIC_SERVICES_GIT_GOMETRICS_CHECKER, body, requestId, this.processResults);
                this.asyncRequestAndProcessResults("metrics", process.env.REACT_APP_BTIIC_SERVICES_GIT_LANGUAGEMETRICS_CHECKER, body, requestId, this.processMetrics);
            } else {
                await this.syncRequestAndProcessResults("javafilestats", process.env.REACT_APP_BTIIC_SERVICES_GIT_TOXICITY_CHECKER, body, requestId, this.processResults);
                await this.syncRequestAndProcessResults("gofilestats", process.env.REACT_APP_BTIIC_SERVICES_GIT_GOMETRICS_CHECKER, body, requestId, this.processResults);
                await this.syncRequestAndProcessResults("metrics", process.env.REACT_APP_BTIIC_SERVICES_GIT_LANGUAGEMETRICS_CHECKER, body, requestId, this.processMetrics);
            }
        } else {
            if (process.env.REACT_APP_ASYNC_MODE === 'true') {
                this.asyncRequestAndProcessResults("javafilestats", process.env.REACT_APP_BTIIC_SERVICES_TOXICITY_CHECKER, body, requestId, this.processResults);
                this.asyncRequestAndProcessResults("gofilestats", process.env.REACT_APP_BTIIC_SERVICES_GOMETRICS_CHECKER, body, requestId, this.processResults);
                this.setState({ metricsReply: [] })
            } else {
                await this.syncRequestAndProcessResults("javafilestats", process.env.REACT_APP_BTIIC_SERVICES_TOXICITY_CHECKER, body, requestId, this.processResults);
                await this.syncRequestAndProcessResults("gofilestats", process.env.REACT_APP_BTIIC_SERVICES_GOMETRICS_CHECKER, body, requestId, this.processResults);
                await this.setState({ metricsReply: [] })
            }
        }
    }

    /**
     * TODO
     * Function that will make a request to designated URL field and store the result in a state variable correlating to the 
     * name param.
     * @param name state variable to store response.
     * @param url api url to which the request will be sent.
     * @param body request body to be sent.
     * @param requestId generated unique request id.
     * @param processHandler handler function used to handle the response.
     * @param processParams any further params for the process handler.
     */
    syncRequestAndProcessResults = async (name, url, body, requestId, processHandler, ...processParams) => {
        try {
            const bodyClone = JSON.parse(JSON.stringify(body));
            bodyClone.name = name;

            this.state.activeCalls.push({ name: name, status: "Running", startTime: moment() });

            let response = await this.syncRequest(url, body, requestId);

            if (response.error) {
                throw new Error(response.error)
            } else {
                let resp = await response.json();
                this.processResponse(processHandler, resp, name, ...processParams);
                return resp;
            }
        } catch (e) {
            this.state.activeCalls.forEach((call, index) => {
                if (call.name === name) {
                    let activeCallsCopy = [...this.state.activeCalls];
                    activeCallsCopy[index].status = "Error"
                    activeCallsCopy[index].finishedTime = moment()
                    this.setState({ activeCalls: activeCallsCopy })
                }
            })
            this.setState({ showWarning: true })
        }
    };

    /**
     * Function that will make a request to designated URL field and store the result in a state variable correlating to the 
     * name param.
     * @param name state variable to store response.
     * @param url api url to which the request will be sent.
     * @param body request body to be sent.
     * @param requestId generated unique request id.
     * @param processHandler handler function used to handle the response.
     * @param processParams any further params for the process handler.
     */
    asyncRequestAndProcessResults = async (name, url, body, requestId, processHandler, ...processParams) => {
        const reqPromise = new Promise(async (resolve) => {
            try {
                const bodyClone = JSON.parse(JSON.stringify(body));
                bodyClone.name = name;

                this.state.activeCalls.push({ name: name, status: "Running", startTime: moment() });


                const response = await this.asyncRequest(url, body, requestId);

                if (response.error) {
                    throw new Error(response.error)
                } else {
                    this.processResponse(processHandler, response, name, ...processParams);
                    resolve(response);
                }

            } catch (e) {
                this.state.activeCalls.forEach((call, index) => {
                    if (call.name === name) {
                        let activeCallsCopy = [...this.state.activeCalls];
                        activeCallsCopy[index].status = "Error"
                        activeCallsCopy[index].finishedTime = moment()
                        this.setState({ activeCalls: activeCallsCopy })
                    }
                })
                this.setState({ showWarning: true })
            }
        });

        return reqPromise;
    };

    /**
     * Function that will handle the data using the processHandler. Once the data
     * has been processed this function will remove the call from the active calls list.
     * @param processHandler process function to handle api response
     * @param data api response
     * @param name name of the metrics call being made. 
     * @param processParams any additional params for the process handler function.
     */
    processResponse = (processHandler, data, name, ...processParams) => {
        processHandler(data, name, ...processParams);
        this.state.activeCalls.forEach((call, index) => {
            if (call.name === name) {
                let activeCallsCopy = [...this.state.activeCalls];
                activeCallsCopy[index].status = "Completed"
                activeCallsCopy[index].finishedTime = moment()
                this.setState({ activeCalls: activeCallsCopy })
            }
        })

    }

    /**
     * Process handler, will set the desired property on the state to either the whole data if 
     * whole data is true or a property of data accessed using the accessor param.
     * @param data data used to set state property
     * @param property state property to be set
     * @param accessor property of data to access. The state property will be set to the value accessed here.
     * @param wholeData boolean determining if the wholeData should be stored or just one property.
     */
    processResults = (data, property, accessor = 'result', wholeData = false) => {
        this.setState({ [property]: wholeData ? data : data[accessor] });
    }

    /**
     * Process handler for the language metrics call. Will set all of the language
     * metrics state properties to the required values returned by git-language-metrics.
     * @param data response from git-language-metrics
     */
    processMetrics = (data) => {
        this.setState({
            jsfilestats: data.result['javascript'],
            cppfilestats: data.result['cpp'],
            swiftfilestats: data.result['swift'],
            scalafilestats: data.result['scala'],
            pythonfilestats: data.result['python'],
            rubyfilestats: data.result['ruby'],
            phpfilestats: data.result['php'],
            luafilestats: data.result['lua'],
            ttcnfilestats: data.result['ttcn'],
            ttcn3filestats: data.result['ttcn3'],
            metricsReply: data.result
        });
    }

    /**
     * Process handler for the cloc call. Sets two state properties, loc and files using cloc reponse.
     * @param data response from git-cloc
     */
    processCloc = (data) => {
        this.setState({
            loc: data.result.header.n_lines,
            files: data.result.header.n_files
        })
    }

    /**
     * Process handler for the breakdown call. Sets the state property breakdown to an array of the 
     * property values returned by the breakdown call.
     * @param data response from language-breakdown
     */
    processBreakdown = (data) => {
        this.setState({ breakdown: Object.values(data) })
    }

    /**
     * Function that generates and sets a new uuidv4 request id. 
     */
    rotateRequestId = () => {

        // Invalidate any inflight requests

        Object.values(this.state.inflightRequests).forEach((prom) => {
            prom.reject();
        })

        // Generate a new requestId, store and return it

        let requestId = uuidv4();
        this.setState({ requestId: requestId });


        return requestId;

    }

    /**
     * Function which creates a CSV object of the values returned by git-language-metrics.
     * In the case that there are metrics replies for different languages with different fields,
     * this function will add any missing fields to each metric data set and assign it the value
     * n/a
     */


    initState = () => {
        this.setState({
            name: undefined,
            loc: undefined,
            files: undefined,
            breakdown: undefined,
            javafilestats: undefined,
            gofilestats: undefined,
            cppfilestats: undefined,
            jsfilestats: undefined,
            swiftfilestats: undefined,
            scalafilestats: undefined,
            pythonfilestats: undefined,
            rubyfilestats: undefined,
            phpfilestats: undefined,
            luafilestats: undefined,
            ttcnfilestats: undefined,
            ttcn3filestats: undefined,
            log: undefined,
            uniqueFiles: undefined,
            revisions: undefined,
            developers: undefined,
            spaceComplexity: undefined,
            ownership: undefined,
            coupling: undefined,
            status: 'Finding Repository',
            processCallsInitiated: false,
            showWarning: false
        })
    }

    /**
     * Returns an icon component based on the current status.
     */
    getIcon = () => {
        switch (this.state.status) {
            case 'Metrics Collected': return <CheckCircleOutlineIcon className="app-bar-icon" />;
            case 'Invalid Repository URL': return <ErrorOutlineIcon className="app-bar-icon" />;
            case 'Detected unsupported Repository': return <WarningIcon className="app-bar-icon" />;
            default: return <HourglassEmptyIcon className="spinning app-bar-icon" />;
        }
    }

    /**
     * If all of the metrics replies are populated and the current status is not Metrics Collected,
     * this function will set the current state to metrics collected and generate the metrics csv.
     */
    isDone = () => {
        if (this.state.status !== 'Metrics Collected' && this.state.metricsReply !== undefined
            && this.state.javafilestats !== undefined && this.state.gofilestats !== undefined) {
            this.setState({ status: 'Metrics Collected' }, () => {
                this.setState({ showDownload: true });
            });
        }

    }

    /**
     * Function that returns the request body object to be send to the microservices.
     * @param url target repository url 
     * @param user target repository username
     * @param pass target repository password
     * @param requestId unique generated requestId
     */
    generateBody = (url, user, pass, requestId, git_mode) => {
        let body;
        if (git_mode) {
            let parsed_url = gh(url);
            body = {
                "projectUrl": this.createProjectUrl(parsed_url.path),
                "server": parsed_url.host,
                "user": encodeURIComponent(user),
                "password": encodeURIComponent(pass),
                "requestId": requestId,
            }

            this.setState({ repoName: parsed_url.path })
        } else {
            body = {
                "repository": url,
                "user": encodeURIComponent(user),
                "password": encodeURIComponent(pass),
            }
            this.setState({ repoName: url })
        }
        return body;
    }

    /**
     * Function that will append .git to any project url that does not contain it. This is to prevent 
     * warning on git clone operation if url does not end with .git.
     * @param url target repository url projectUrl, path property of url parsed by parse-github-url.
     */
    createProjectUrl = (url) => {
        const urlLength = url.length;
        if (url.substring(urlLength - 4, urlLength) !== '.git') {
            return '/' + url + '.git';
        } else {
            return '/' + url;
        }
    }
}

export default MetricTabs;
