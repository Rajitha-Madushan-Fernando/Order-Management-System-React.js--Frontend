import React, { Component } from "react";

import {
    Button, TableRow, Paper, TextField, Grid, Container, MenuItem, InputLabel, FormHelperText,
    Select, Table, TableBody, TableCell, TableContainer, TableHead,

} from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import UpdateIcon from '@material-ui/icons/Update';
import SendIcon from '@material-ui/icons/Send';

import utils from '../../helper/utils';
import { appConfig } from '../../configs/app.config';
const { baseUrl } = appConfig;




export default class ProductToOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order_id: this.props.match.params.id,
            product: "",
            quantity: null,
            productData: [],
            orderDetails: [],
            show: false,
            errors: {
                product: '',
                quantity: '',
            }
        }
        this.submitOrderProduct = this.submitOrderProduct.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.resetErrorState = this.resetErrorState.bind(this);

    };

    handleInputChange(event) {
        const { value, name } = event.target;
        console.log('name', name, 'value', value);
        this.setState({ [name]: value });


    }

    resetState() {
        console.log('resetSate');
        this.setState({
            product: "", quantity: "",
        });
    }

    resetErrorState() {
        console.log('resetErrorState');
        this.setState({
            errors: {
                product: '',
                quantity: '',
            }
        })
    }

    componentDidMount() {
        const OrderId = this.state.order_id;
        this.findAllProduct();
        //console.log('OrderId',OrderId);
        if (OrderId) {
            this.findOrderById(OrderId);
        }

    }

    findOrderById = (OrderId) => {
        axios.get(`${baseUrl}/order/list/` + OrderId)

            .then(response => {
                if (response.data != null) {
                    const {
                        id,
                        orderDetails,
                    } = response.data
                    this.setState({
                        order_id: id,
                        orderDetails: orderDetails

                    });

                }


            }).catch((error) => {
                console.error("Error - " + error);
            });
    };

    findAllProduct() {
        axios.get(`${baseUrl}/product/list/`)
            .then(response => response.data)
            .then((data) => {
                this.setState({ productData: data });
                console.log(data);
            });

    }



    submitOrderProduct = event => {
        event.preventDefault();

        const order_product = {
            order_id: this.state.order_id,
            "product": {
                "id": utils.emptyToNull(this.state.product),
            },
            quantity: this.state.quantity
        };
        axios.post(`${baseUrl}/order-detail/add`, order_product)
            .then(response => {

                //this.setState({ "show": false });
                utils.showSuccess("Product Saved Successfully.");
                this.findOrderById(this.state.order_id);
                this.resetErrorState();
                this.resetState();
                
            })
            .catch(_errors => {
                if (_errors.response) {
                    const { errors } = _errors.response.data;
                    console.log('errors', errors);
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
        const { productData, orderDetails } = this.state;
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                            <form onSubmit={this.state.id ? this.updateOrderProduct : this.submitOrderProduct} >
                                <TextField
                                    name="order_id"
                                    defaultValue={this.props.match.params.id}
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
                                        <MenuItem value='' >
                                            --Select Product--
                                        </MenuItem>
                                        {
                                            productData.map((eachRow, index) => {
                                                return (
                                                    <MenuItem value={eachRow.id} key={eachRow.id}>{eachRow.name}</MenuItem>);
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
                                    onClick={(e) => { e.preventDefault(); this.resetErrorState(); this.resetState(); }}
                                >
                                    Reset</Button>
                            </form>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table" className="order-product-table">
                                    <TableHead>
                                        <TableRow style={{ backgroundColor: '#00bcd4', color: '#fafafa' }} variant="head">
                                            <TableCell>Product Name</TableCell>
                                            <TableCell>Code</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Required Quanity</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {orderDetails.map((eachRow, index) => {

                                            return (<TableRow key={index}>
                                                <TableCell>{eachRow.product.name}</TableCell>
                                                <TableCell>{eachRow.product.product_code}</TableCell>
                                                <TableCell>{eachRow.product.price}</TableCell>
                                                <TableCell>{eachRow.quantity}</TableCell>
                                                <TableCell>
                                                    <Link to={"../EditProductToOrder/" + eachRow.id} >
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            size="small"
                                                            startIcon={<UpdateIcon />}

                                                        >
                                                            Update
                                        </Button>
                                                    </Link>

                                                </TableCell>
                                            </TableRow>
                                            )
                                        }, []
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>

                </Grid>
            </div>
        )
    }
}

