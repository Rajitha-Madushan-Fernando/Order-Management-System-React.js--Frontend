import React, { Component } from "react";

import {
  Button, ButtonGroup,
  Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Grid,Container
} from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';

import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import './CustomerList.css'

import { appConfig } from '../../configs/app.config';
import utils from '../../helper/utils';
const { baseUrl } = appConfig;


export default class CustomerList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customer: []
    };
  }

  componentDidMount() {
    this.findAllCustomers();
  }

  findAllCustomers() {
    axios.get(`${baseUrl}/customer/list/`)
      /** .then(response => console.log(response.data));*/
      .then(response => response.data)
      .then((data) => {
        this.setState({ customer: data });
      });
  }

  deleteCustomer = (customerId) => {
    axios.delete(`${baseUrl}/customer/delete/` + customerId)
      .then(response => {
        if (response.data != null) {
          this.setState({ "show": true });
          setTimeout(() => this.setState({ "show": false }), 3000);
          this.setState({
            customer: this.customer.filter(customer => customer.id !== customerId)
          });
        }
        else {
          this.setState({ "show": false });
        }

      });

  };

  render() {

    return (
      <div>
        <Link to={"NewCustomer"} >
          <Button
            variant="contained"
            color="secondary"
            className="new-customer-add-button"
            startIcon={<CloudUploadIcon />}

          >
            New Customer
            </Button>
        </Link>
        <br /><br /><br />
        <Grid item xs={12} sm={10}>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow style={{ backgroundColor: '#2196f3', color: '#fafafa' }} variant="head">
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Contact Number</TableCell>
                  <TableCell>Customer ID</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {
                  this.state.customer.length === 0 ?
                    <TableRow align="center">
                      <TableCell colSpan="5">No Customers Available</TableCell>
                    </TableRow> :
                    this.state.customer.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>{customer.customer_name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.address}</TableCell>
                        <TableCell>{customer.contact_number}</TableCell>
                        <TableCell>{customer.cus_unique_id}</TableCell>
                        <TableCell>
                            <Link to={"UpdateCustomer/" + customer.id} >
                              <Button
                                size="sm"
                                variant="outline-danger"
                              >
                                <EditIcon />
                              </Button>
                            </Link>
                            <Button size="sm" variant="outline-danger" onClick={this.deleteCustomer.bind(this, customer.id)}>
                              <DeleteForeverIcon />
                            </Button>
                        </TableCell>
                      </TableRow>
                    ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </div>
    )
  }
}

