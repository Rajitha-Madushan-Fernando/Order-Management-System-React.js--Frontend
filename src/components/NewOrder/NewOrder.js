import React, { Component } from "react";

import {
    Button, TableRow, Paper, TextField, Grid, Form, Container,
    MenuItem, InputLabel, FormHelperText,
    FormControl, Select
} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SendIcon from '@material-ui/icons/Send';
import CustomMessage from '../CustomMessage/CustomMessage';



import { appConfig } from '../../configs/app.config';
import utils from '../../helper/utils';
const { baseUrl } = appConfig;


export default class NewOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            oid: null,
            date: null,
            customer_id: null,
            remarks: null,
            status: null,
            show: false,
            customerData: []

        }
        this.submitOrder = this.submitOrder.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    };


    handleInputChange(event) {
        const { value, name } = event.target;
        console.log('value', value);
        console.log('name', name);
        this.setState({ [name]: value });


    }

    componentDidMount() {
        const orderId = this.props.match.params.id;
        this.findAllCustomers();
        if (orderId) {
            this.findorderById(orderId);
        }
    }


    findAllCustomers() {
        axios.get(`${baseUrl}/customer/list/`)
            .then(response => response.data)
            .then((data) => {
                this.setState({ customerData: data });
                console.log(data);
            });

    }

    findorderById = (orderId) => {
        axios.get(`${baseUrl}/order/list/` + orderId)
            .then(response => {
                if (response.data != null) {
                    console.log('response', response);
                    this.setState({
                        id: response.data.id,
                        customer_id: response.data.customer.id,
                        oid: response.data.order_unique_id,
                        remarks: response.data.remarks,
                        status: response.data.status,
                        date: response.data.orderDate,
                    });
                }
            }).catch((error) => {
                console.error("Error - " + error);
            });
    };

    updateOrder = event => {
        event.preventDefault();

        const order = {
            id: this.state.id,
            order_unique_id: this.state.oid,
            orderDate: this.state.date,
            "customer" : {
                "id" :  this.state.customer_id
            },
            remarks: this.state.remarks,
            status: this.state.status
        };

        axios.put(`${baseUrl}/order/add/`, order)
            .then(response => {

                if (response.data != null) {
                    this.setState({ "show": true, "method": "put" });
                }
                else {
                    this.setState({ "show": false });
                }
            });
        this.setState(this.initialState);
    };

    submitOrder = event => {
        event.preventDefault();

        const order = {
            order_unique_id: this.state.oid,
            orderDate: this.state.date,
            "customer" : {
                "id" :  this.state.customer_id
            },
            remarks: this.state.remarks,
            status: this.state.status
        };
        axios.post(`${baseUrl}/order/add`, order)
            .then(response => {
                //console.log('orderData',response);
                //this.setState({ "show": false });
                utils.showSuccess("Order Saved Successfully.");

                this.resetErrorState();
                this.resetState();
            })
            .catch(_errors => {
                // if (_errors.response) {
                //     const { errors } = _errors.response.data;
                //     let errorsObj = {}
                //     errors.forEach(error => {
                //         const { defaultMessage, field } = error
                //         errorsObj[field] = defaultMessage;
                //     })
                //     console.log(errorsObj);
                //     this.setState({ errors: errorsObj });
                // }
            });
    };

    render() {
        const { customerData,customer_id } = this.state;
        return (
            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <CustomMessage show={this.state.show} message={this.state.method === "put" ? "Order Updated Successfully." : "Order Saved Successfully."} severity={"success"} />
                </div>
                <Container maxWidth="sm" style={{ float: "left" }}>
                    <form onSubmit={this.state.id ? this.updateOrder : this.submitOrder} >
                        <TextField
                            name="oid"
                            value={this.state.oid}
                            id="outlined-full-width"
                            label="Order ID"
                            style={{ margin: 2 }}
                            placeholder="Enter Order ID"
                            helperText="This field is required"
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
                            name="date"
                            value={this.state.date}
                            onChange={this.handleInputChange}
                            id="outlined-full-width"
                            label="Order Date"
                            style={{ margin: 2 }}
                            placeholder="Enter date"
                            helperText="This field is required"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                        <br /><br />

                        <Select
                            variant="outlined"
                            name="customer_id"
                            value={this.state.customer_id}
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            
                            onChange={this.handleInputChange}
                            fullWidth
                        >
                            <MenuItem value=""  selected="selected">
                                Placeholder
                            </MenuItem>
                            {
                                customerData.map((eachRow, index) => {
                                    return (
                                        <MenuItem value={eachRow.id}>{eachRow.customer_name}</MenuItem>);
                                })
                            }
                        </Select>
                        <FormHelperText>This field is required</FormHelperText>
                        <br />
                        <TextField
                            name="remarks"
                            value={this.state.remarks}
                            onChange={this.handleInputChange}
                            id="outlined-full-width"
                            label="Order Remarks"
                            style={{ margin: 2 }}
                            placeholder="Enter order remarks"
                            helperText="This field is required"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                        <br /><br />
                        <Select
                            variant="outlined"
                            name="status"
                            value={this.state.status}
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"

                            onChange={this.handleInputChange}
                            fullWidth
                        >

                            <MenuItem value="" >
                                Please Select one
                             </MenuItem>
                            <MenuItem value={1}>Active</MenuItem>
                            <MenuItem value={0}>Inactive</MenuItem>
                        </Select>
                        <FormHelperText>This field is required</FormHelperText>
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
        )
    }
}

