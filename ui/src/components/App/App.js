import React, { Component } from 'react';
import MetricTabs from '../MetricTabs/MetricTabs';
import RepoInput from '../RepoInput/RepoInput';
import './App.css';

import Websocket from 'react-websocket';

class App extends Component {
    constructor() {
        super();
        this.state = {
            socketConnected: false,
            repoSelected: false,
            submitEvent: {},
            socketId: ''
        }
    }

    render() {
        let MainComponent, WebSocket;
        if (this.state.repoSelected) {
            MainComponent = <MetricTabs updateError={this.updateError.bind(this)} socketId={this.state.socketId} inflightRequests={this.setInflight} submitEvent={this.state.submitEvent} return={this.changeState}></MetricTabs>
        } else {
            MainComponent = <RepoInput socketId={this.state.socketId} socketConnected={this.state.socketConnected} onFormSubmit={this.onFormSubmit} error={this.state.error}></RepoInput>
        }

        if (process.env.REACT_APP_ASYNC_MODE === 'true') {
            WebSocket = <Websocket url='ws://socket.callback.cluster.rp.bt.com' onOpen={this.socketConnected} onMessage={this.socketMessage} />
        } else {
            WebSocket = null
        }

        return (
            <div className="App">
                {MainComponent}
                {WebSocket}
            </div>
        );
    }

    /**
     * Function used to set error property to error param. Will set repo selected to false displaying repoInput again.
     * @param error Error message to be set.
     */
    updateError(error) {
        this.setState({
            repoSelected: false,
            error: error
        })
    }

    changeState = () => {
        this.setState({ repoSelected: false })
    }

    onFormSubmit = (event) => {
        event.persist()
        this.setState({ repoSelected: true, submitEvent: event });
    }

    setInflight = (_inflightRequests) => {
        this.setState({ inflightRequests: _inflightRequests });
    }

    socketConnected = async () => {
        this.setState({ socketConnected: true });
    }

    /**
     * Function that will handle socket onMessage events. In the case it is a 
     * callback event, the desired request stored in the inflightRequests list 
     * be resolved or rejected depending on whether or not an inflight request 
     * exists with the event message.path.
     * @param event onMessage event recieved from WebSocket
     */
    socketMessage = async (event) => {
        try {
            // Parse the message received from the socket
            let message = JSON.parse(event);


            // If the message received is of type connect then
            // it contains the id of the queue we have been assigned
            if (message.type === "connect") {
                this.setState({ socketId: message.id });
            }

            if (message.type === "callback") {
                if (Object.keys(this.state.inflightRequests).includes(message.path)) {
                    try {
                        this.state.inflightRequests[message.path].resolve(JSON.parse(message.data));
                    } catch (pEx) {
                        this.state.inflightRequests[message.path].reject();
                    }
                    delete this.state.inflightRequests[message.path];
                } else {
                    console.log('Message Not Found: ' + JSON.parse(message.data))
                    console.log('Request not found: ' + this.state.inflightRequests);
                }
            }

        } catch (exception) {
            console.log(exception);
            console.log("Invalid socket message receieved")
        }

    }

}

export default App;
