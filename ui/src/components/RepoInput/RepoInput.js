import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, InputLabel, FormControl } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './RepoInput.css';
import Alert from '@material-ui/lab/Alert';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class RepoInput extends Component {
    state = {
        status: 'Ready',
        show: false,
        language: 'All Languages'
    }

    

    render() {
        let submitButton;
        if (process.env.REACT_APP_ASYNC_MODE === true) {
            submitButton = <Button variant="contained" color="primary" type="submit" disabled={(!this.props.socketConnected) || this.props.socketId === ''}>Submit</Button>
        } else {
            submitButton = <Button variant="contained" color="primary" type="submit">Submit</Button>
        }

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <img src={require('../../assets/beta-logo.png')} className="beta-logo" alt="" />
                        <Typography variant="h6" color="inherit" align="center">
                            BTIIC Repository Analyser
                        </Typography>
                    </Toolbar>
                    {this.props.error && <Alert severity="error">{this.props.error}</Alert>}
                </AppBar>
                <form className="repo-input-form" onSubmit={this.props.onFormSubmit}>
                    <div className="form-group"><TextField className="field" label="URL" name="url" type="text" required /></div>
                    <div className="form-group"><TextField className="field" label="User" name="user" type="text" /></div>
                    <div className="form-group"><TextField className="field" label="Password" name="password" type="password" /></div>
                    <FormControl className="form-control">
                        <InputLabel id="repository-type">Repository Type</InputLabel>
                        <Select
                            className="field"
                            labelId="repository-type"
                            id="repository-type"
                            name="repoType"
                            defaultValue={""}
                            onChange={(e) => this.setState({gitMode: e.target.value})}
                        >
                            <MenuItem value={false}>SVN</MenuItem>
                            <MenuItem value={true}>GIT</MenuItem>
                        </Select>
                    </FormControl>

                    {submitButton}
                </form>
            </div>
        );
    }
}

export default RepoInput;