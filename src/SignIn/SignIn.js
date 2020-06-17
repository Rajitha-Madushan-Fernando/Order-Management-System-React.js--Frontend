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

  handleInputChange(event) {
    const { value, name } = event.target;
    console.log('value', value);
    console.log('name', name);
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
        tokens.save({'userType':'user', 'token': response.data.accessToken});
        //this.setState({ "show": false });
        //utils.showSuccess("User Successfully login.");

        this.resetErrorState();
        this.resetState();
      })
      .catch(_errors => {
        if (_errors.response) {
          const { errors } = _errors.response.data;
          let errorsObj = {}
          errors.forEach(error => {
            const { defaultMessage, field } = error
            errorsObj[field] = defaultMessage;
          })
          console.log(errorsObj);
          this.setState({ errors: errorsObj });
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
              //helperText={this.state.errors.name}
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
              //helperText={this.state.errors.product_code}
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

