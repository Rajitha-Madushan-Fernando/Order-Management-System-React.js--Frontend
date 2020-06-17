import React, { Component } from "react";

import {
  Button, TextField, Container, MenuItem, InputLabel, FormHelperText, Select
} from '@material-ui/core';
import axios from 'axios';
import SendIcon from '@material-ui/icons/Send';

import utils from '../helper/utils';
import { appConfig } from '../configs/app.config';
import tokens from "../helper/tokens";
const { baseUrl } = appConfig;


export default class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: null,
      show: false,
      errors: {
        username: '',
        password: '',
      }
    }
    this.submitUser = this.submitUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

  };

  resetErrorState() {
    this.setState({
      errors: {
        username: '',
        password: '',
      }
    })
  }


  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });


  }


  submitUser = event => {
    event.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    axios.post(`${baseUrl}/api/auth/signin`, user)
      .then(response => {
        console.log('response');
        tokens.save({ 'userType': 'user', 'token': response.data.accessToken });
        this.resetErrorState();
      })
      .catch(_errors => {
        if (_errors.response) {
          const { status, data } = _errors.response;
          console.log('_errors.response', _errors.response);
          if (status == 401) {
            console.log('data.error', data.error);
            utils.showError("Bad Credintials");
          }
          else {
            let errorsObj = {}
            data.errors.forEach(error => {
              const { defaultMessage, field } = error
              errorsObj[field] = defaultMessage;
            })
            console.log(errorsObj);
            this.setState({ errors: errorsObj });
          }

        }
      });
  };


  render() {

    return (
      <div>
        <Container maxWidth="sm">
          <form onSubmit={this.submitUser} >
            <TextField
              name="username"
              id="outlined-full-width"
              label="User Name"
              style={{ margin: 2 }}
              placeholder="Enter Username"
              helperText={this.state.errors.username}
              fullWidth
              onChange={this.handleInputChange}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <br /><br />
            <TextField
              name="password"
              onChange={this.handleInputChange}
              id="outlined-full-width"
              label="Password"
              style={{ margin: 2 }}
              placeholder="Enter Password"
              helperText={this.state.errors.password}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <br /><br />

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              startIcon={<SendIcon />}
            >
              Login
            </Button>
          </form>
        </Container>
      </div>
    )
  }
}

