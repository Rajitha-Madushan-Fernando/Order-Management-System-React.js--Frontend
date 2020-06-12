import React, { Component } from "react";

import {
  Button, TableRow, Paper, TextField, Grid, Form,Container
} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SendIcon from '@material-ui/icons/Send';
import CustomMessage from '../CustomMessage/CustomMessage';


import { appConfig } from '../../configs/app.config';
const { baseUrl } = appConfig;


export default class NewProduct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      product_code: '',
      price: '',
      unit: '',
      status: '',
      show: false
    }
    this.submitProduct = this.submitProduct.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

  };

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });


  }

  resetState() {
    this.setState({
      id:'', name: '', product_code: '', price: '', unit: '', status: ''
    })
  }

  componentDidMount(){
    const productId = +this.props.match.params.id;

    if(productId){
       this.findProductById(productId);
    }
  }

  findProductById = (productId) => {
    axios.get(`${baseUrl}/product/list/`+productId)
        .then(response => {
            if(response.data != null) {
                console.log('response',response);
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    product_code: response.data.product_code,
                    price: response.data.price,
                    unit: response.data.unit,
                    status: response.data.status,
                });
            }
        }).catch((error) => {
            console.error("Error - "+error);
        });
  };

  updateProduct = event => {
    event.preventDefault();

    const product = {
        id: this.state.id,
        name: this.state.name,
        product_code: this.state.product_code,
        price: this.state.price,
        unit: this.state.unit,
        status: this.state.status
    };

    axios.put(`${baseUrl}/product/add/` ,product)
        .then(response => {
          
            if (response.data != null) {
                this.setState({"show":true, "method":"put"});
            }
            else{
                this.setState({"show":false});
            }
        });
        this.setState(this.initialState);
  };

  submitProduct = event => {
    event.preventDefault();

    const product = {
        name: this.state.name,
        product_code: this.state.product_code,
        price: this.state.price,
        unit: this.state.unit,
        status: this.state.status
    };
    axios.post(`${baseUrl}/product/add`, product)
      .then(response => {
        if (response.data != null) {
          console.log(product);
          this.setState({ "show": true, "method": "post" });
        }
        else {
          this.setState({ "show": false });
        }
      });
  };


  render() {
    
    return (
      <div>
        <div style={{"display":this.state.show ? "block" : "none"}}>
            <CustomMessage show ={ this.state.show } message= {this.state.method === "put" ? "Product Updated Successfully." : "Product Saved Successfully."} severity= {"success"}/>
        </div>
        <Container maxWidth="sm" style={{float:"left"}}>
        <form onSubmit={this.state.id ? this.updateProduct : this.submitProduct } >
          <TextField
            name="name"
            value={this.state.name}
            id="outlined-full-width"
            label="Product Name"
            style={{ margin: 2 }}
            placeholder="Enter Product Name"
            helperText="This field is required!"
            fullWidth
            onChange={this.handleInputChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            name="product_code"
            value={this.state.product_code}
            onChange={this.handleInputChange}
            id="outlined-full-width"
            label="Product Code"
            style={{ margin: 2 }}
            placeholder="Enter Product Code"
            helperText="This field is required!"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            name="price"
            value={this.state.price}
            onChange={this.handleInputChange}
            id="outlined-full-width"
            label="Price"
            style={{ margin: 2 }}
            placeholder="Enter Price"
            helperText="This field is required!"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            name="unit"
            value={this.state.unit}
            onChange={this.handleInputChange}
            id="outlined-full-width"
            label="Current Stock"
            type="number"
            style={{ margin: 2 }}
            placeholder="Enter Current stock"
            helperText="This field is required!"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />

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
          >
            Reset</Button>
        </form>
       </Container>     
      </div>
    )
  }
}

