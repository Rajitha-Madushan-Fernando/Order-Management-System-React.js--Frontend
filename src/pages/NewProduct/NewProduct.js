import React, { Component } from "react";

import {
  Button, TextField, Container, MenuItem, InputLabel, FormHelperText, Select
} from '@material-ui/core';
import axios from 'axios';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SendIcon from '@material-ui/icons/Send';
import CustomMessage from '../CustomMessage/CustomMessage';

import utils from '../../helper/utils';
import { appConfig } from '../../configs/app.config';
const { baseUrl } = appConfig;


export default class NewProduct extends Component {


  constructor(props) {
    super(props);
    this.state = {
      name: "",
      product_code: null,
      price: null,
      unit: null,
      status: null,
      show: false,
      errors: {
        name: '',
        product_code: '',
        price: '',
        unit: '',
        status: '',
      }
    }
    this.submitProduct = this.submitProduct.bind(this);
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
      id: null, name: null, product_code: null, price: null, unit: null, status: null
    })
  }

  resetErrorState() {
    this.setState({
      errors: {
        name: '',
        product_code: '',
        price: '',
        unit: '',
        status: '',
      }
    })
  }

  componentDidMount() {
    const productId = +this.props.match.params.id;

    if (productId) {
      this.findProductById(productId);
    }
  }

  findProductById = (productId) => {
    axios.get(`${baseUrl}/product/list/` + productId)
      .then(response => {
        if (response.data != null) {
          console.log('response', response);
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
        console.error("Error - " + error);
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

    axios.put(`${baseUrl}/product/add/`, product)
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

        //this.setState({ "show": false });
        utils.showSuccess("Product Saved Successfully.");

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
        <div style={{ "display": this.state.show ? "block" : "none" }}>
          <CustomMessage show={this.state.show} message={this.state.method === "put" ? "Product Updated Successfully." : "Product Saved Successfully."} severity={"success"} />
        </div>
        <Container maxWidth="sm" style={{ float: "left" }}>
          <form onSubmit={this.state.id ? this.updateProduct : this.submitProduct} >
            <TextField
              name="name"
              value={this.state.name}
              id="outlined-full-width"
              label="Product Name"
              style={{ margin: 2 }}
              placeholder="Enter Product Name"
              helperText={this.state.errors.name}
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
              name="product_code"
              value={this.state.product_code}
              onChange={this.handleInputChange}
              id="outlined-full-width"
              label="Product Code"
              style={{ margin: 2 }}
              placeholder="Enter Product Code"
              helperText={this.state.errors.product_code}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <br /><br />
            <TextField
              name="price"
              value={this.state.price}
              onChange={this.handleInputChange}
              id="outlined-full-width"
              label="Price"
              style={{ margin: 2 }}
              placeholder="Enter Price"
              helperText={this.state.errors.price}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <br /><br />
            <TextField
              name="unit"
              value={this.state.unit}
              onChange={this.handleInputChange}
              id="outlined-full-width"
              label="Current Stock"
              style={{ margin: 2 }}
              placeholder="Enter Current stock"
              helperText={this.state.errors.unit}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <br /><br />
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Product Status
            </InputLabel>  
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
            <FormHelperText>{this.state.errors.status}</FormHelperText>
            <br />
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

