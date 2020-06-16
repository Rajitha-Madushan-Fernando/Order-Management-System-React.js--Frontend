import React, { Component } from "react";

import {
    Button, TableRow, Paper, TextField, Grid, Form, Container, MenuItem, InputLabel, FormHelperText,
    FormControl, Select, Table, TableBody, TableCell, TableContainer, TableHead,

} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import UpdateIcon from '@material-ui/icons/Update';
import SendIcon from '@material-ui/icons/Send';
import CustomMessage from '../CustomMessage/CustomMessage';

import utils from '../../helper/utils';
import { appConfig } from '../../configs/app.config';
const { baseUrl } = appConfig;




export default class EditOrderProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productData:[],
            order_id: null,
            product: null,
            quanity: null,
            show: false,
            errors: {
                product: '',
                quanity: '',
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.resetErrorState = this.resetErrorState.bind(this);

    };

    handleInputChange(event) {
        const { value, name } = event.target;
        console.log('value', value);
        console.log('name', name);
        this.setState({ [name]: value });


    }
    resetState() {
        this.setState({
            id: null, order_id:null, product: null, quanity: null,
        })
    }

    resetErrorState() {
        this.setState({
            errors: {
                product: '',
                quanity: '',
            }
        })
    }
    componentDidMount() {
        const OrderProductId = this.props.match.params.id;
        this.findAllProduct();
        console.log('OrderProductId',OrderProductId);
        if (OrderProductId) {
            this.findOrderById(OrderProductId);
        }

    }
    //Fetch all order+customer+product details related to single order
    findOrderById = (OrderProductId) => {
        axios.get(`${baseUrl}/order-detail/list/` + OrderProductId)

            .then(response => {
                if (response.data != null) {
                    const {
                        id,
                        order_id,
                        quantity,
                        product


                    } = response.data
                    this.setState({
                        id: id,
                        order_id: order_id,
                        quantity: quantity,
                        product: product.id,
                    });
                    console.log('OrderId',order_id);
                }
                

            }).catch((error) => {
                console.error("Error - " + error);
            });
    };

    //This is for Product Select box
    findAllProduct() {
        axios.get(`${baseUrl}/product/list/`)
            .then(response => response.data)
            .then((data) => {
                this.setState({ productData: data });
                console.log(data);
            });

    }
    updateOrderProduct = event => {
        event.preventDefault();

        const order = {
            id: this.state.id,
            order_id: this.state.order_id,
            "product": {
                "id": this.state.product
            },
            quantity: this.state.quantity
        };

        axios.post(`${baseUrl}/order-detail/add/`, order)

            .then(response => {
                //console.log('id', this.state.id);
                this.props.history.push('/ProductToOrder/' + this.state.order_id);
                utils.showSuccess("Product Saved Updated.");
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
        this.setState(this.initialState);
    };
    render() {
        const { productData,order_id} = this.state;
        return (
            <div>
                <Container maxWidth="sm" style={{ float: "left" }}>
                    <form onSubmit={this.updateOrderProduct} >
                        <TextField
                            name="order_id"
                            value={this.state.order_id}
                            id="outlined-full-width"
                            label="Order ID"
                            style={{ margin: 2 }}
                            fullWidth
                            onChange={this.handleInputChange}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,

                            }}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                        />
                        
                        <br /><br />
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                            Product Name
            </InputLabel>
                        <Select
                            variant="outlined"
                            name="product"
                            value={this.state.product}
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            onChange={this.handleInputChange}
                            fullWidth
                        >
                            <MenuItem value="" >
                                --Select Product--
                                    </MenuItem>
                            {
                                productData.map((eachRow, index) => {
                                    return (
                                        <MenuItem value={eachRow.id}>{eachRow.name}</MenuItem>);
                                })
                            }
                        </Select>
                        <FormHelperText>{this.state.errors.product}</FormHelperText>
                        <br /><br />
                        <TextField
                            name="quantity"
                            value={this.state.quantity}
                            onChange={this.handleInputChange}
                            id="outlined-full-width"
                            label="quantity"
                            style={{ margin: 2 }}
                            placeholder="Enter Price"
                            helperText={this.state.errors.quantity}
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

