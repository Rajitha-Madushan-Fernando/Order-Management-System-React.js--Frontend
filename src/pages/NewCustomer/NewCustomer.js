import React, { Component } from "react";

import {
  Button, TextField, Container
} from '@material-ui/core';
import axios from 'axios';
import './NewCustomer.css'
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SendIcon from '@material-ui/icons/Send';
import CustomMessage from '../CustomMessage/CustomMessage';
import AppTemplate from "../../Templates/AppTemplate/AppTemplate";


import { appConfig } from '../../configs/app.config';
import  utils  from '../../helper/utils';
const { baseUrl } = appConfig;


export default class NewCustomer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      name: null,
      email: null,
      contact_number: null,
      address: null,
      show: false,
      errors: {
        cus_unique_id: '',
        customer_name: '',
        email: '',
        contact_number: '',
        address: '',
      }
    }
    this.submitCustomer = this.submitCustomer.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.resetErrorState = this.resetErrorState.bind(this);

  };

  handleInputChange(event) {
    const { value, name } = event.target;
    //console.log('value', value);
    //console.log('name', name);
    this.setState({ [name]: value });


  }

  resetState() {
    this.setState({
      id: null, uid: null, name: null, email: null, contact_number: null, address: null
    })
  }

  resetErrorState() {
    this.setState({
      errors: {
        cus_unique_id: '',
        customer_name: '',
        email: '',
        contact_number: '',
        address: '',
      }
    })
  }

  componentDidMount() {
    const customerId = +this.props.match.params.id;

    if (customerId) {
      this.findCustomerById(customerId);
    }
  }

  findCustomerById = (customerId) => {
    axios.get(`${baseUrl}/customer/list/` + customerId)
      .then(response => {
        if (response.data != null) {
          console.log('response', response);
          this.setState({
            id: response.data.id,
            uid: response.data.cus_unique_id,
            name: response.data.customer_name,
            email: response.data.email,
            address: response.data.address,
            contact_number: response.data.contact_number,
          });
        }
      }).catch((error) => {
        console.error("Error - " + error);
      });
  };

  updateCustomer = event => {
    this.resetErrorState();
    event.preventDefault();

    const customer = {
      id: this.state.id,
      cus_unique_id: this.state.uid,
      customer_name: this.state.name,
      email: this.state.email,
      contact_number: this.state.contact_number,
      address: this.state.address
    };

    axios.post(`${baseUrl}/customer/add/`, customer)
      .then(response => {
        if (response.data != null) {
          utils.showSuccess("Customer Update Successfully.");
        }
        else {
          this.setState({ "show": false });
        }
      });
    this.setState(this.initialState);
  };

  submitCustomer = event => {
    this.resetErrorState();
    event.preventDefault();

    const customer = {
      cus_unique_id: this.state.uid,
      customer_name: this.state.name,
      email: this.state.email,
      contact_number: this.state.contact_number,
      address: this.state.address
    };
    axios.post(`${baseUrl}/customer/add`, customer)
      .then(response => {

        //this.setState({ "show": false });
        utils.showSuccess("Customer Saved Successfully.");

        this.resetErrorState();
        this.resetState();
      })
      .catch(_errors => {
        if (_errors.response) {
          const { errors, error } = _errors.response.data;
          if(errors!==undefined){
            let errorsObj = {}
            errors.forEach(error => {
              const { defaultMessage, field } = error
              errorsObj[field] = defaultMessage;
            })
            console.log(errorsObj);
            this.setState({ errors: errorsObj });
          }
          else {
            utils.showError(error)
          }

        }
      });
  };


  render() {

    return (
      <AppTemplate>
        <div className="customer-add">
        <Container maxWidth="sm" style={{ float: "left" }}>
          <form onSubmit={this.state.id ? this.updateCustomer : this.submitCustomer} >
            <TextField
              name="uid"
              value={this.state.uid}
              id="outlined-full-width"
              label="Customer ID"
              style={{ margin: 2 }}
              placeholder="Enter Customer ID"
              helperText={this.state.errors.cus_unique_id}
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
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              id="outlined-full-width"
              label="Customer Name"
              style={{ margin: 2 }}
              placeholder="Enter Customer Name"
              helperText={this.state.errors.customer_name}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <br /><br />
            <TextField
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              id="outlined-full-width"
              label="Email"
              style={{ margin: 2 }}
              placeholder="Enter Customer Email"
              helperText={this.state.errors.email}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <br /><br />
            <TextField
              name="contact_number"
              value={this.state.contact_number}
              onChange={this.handleInputChange}
              id="outlined-full-width"
              label="Contact Number"
              type="number"
              style={{ margin: 2 }}
              placeholder="Enter Customer Contact Number"
              helperText={this.state.errors.contact_number}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <br /><br />
            <TextField
              name="address"
              value={this.state.address}
              onChange={this.handleInputChange}
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              fullWidth
              rows={4}
              placeholder="Enter Customer Address"
              helperText={this.state.errors.address}
              variant="outlined"
            />
            <br /><br />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              startIcon={<SendIcon />}
            >
              {this.state.id ? "Update" : "Save"}
            </Button>
            {" "}
            <Button
              type="reset"
              variant="contained"
              color="primary"
              endIcon={<RotateLeftIcon />}
              onClick={this.resetErrorState}
            >
              Reset</Button>
          </form>
        </Container>
        </div>
      </AppTemplate>
    )
  }
}

