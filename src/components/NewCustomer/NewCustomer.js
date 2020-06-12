import React, { Component } from "react";

import {
     Button,TableRow, Paper,TextField,Grid,Form
} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './NewCustomer.css' 
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SendIcon from '@material-ui/icons/Send';

import {  appConfig  } from '../../configs/app.config'; 
const { baseUrl } = appConfig;


export default class CustomerList extends Component {

  constructor(props) {
    super(props); 
    this.state =  {
      uid:'', 
      name:'', 
      email:'', 
      contact_number:'', 
      address:'',
      show:false
    }
    this.submitCustomer = this.submitCustomer.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

  };
  
	handleInputChange(event) {
    const {value, name } = event.target;
    console.log('value',value);
    console.log('name',name);
    this.setState({ [name]: value });

    
	}
 
  resetState(){
    this.setState({
      uid:'', name:'', email:'', contact_number:'', address:''
    })
  }
   
  
  submitCustomer = event => {
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
            if (response.data != null) {
                console.log(customer);
                this.setState({"show":true, "method":"post"});
            }
            else{
               this.setState({"show":false});
            }
        });
        //this.setState(this.initialState);
  };


    render() {
       const { uid, name, email, contact_number, address } = this.state; 
       const header = this.state.show?'show aler ':'hide alert';
        return (
            <div>
              <Grid container spacing={3}>
              {header}
              <form  onSubmit={this.submitCustomer} >
                  <Grid item xs={4}>
                  <TextField
                    name="uid"
                    id="outlined-full-width"
                    label="Customer ID"
                    style={{ margin: 2 }}
                    placeholder="Enter Customer ID"
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
                        name="name"
                        onChange={this.handleInputChange}
                        id="outlined-full-width"
                        label="Customer Name"
                        style={{ margin: 2 }}
                        placeholder="Enter Customer Name"
                        helperText="This field is required!"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        name="email"
                        onChange={this.handleInputChange}
                        id="outlined-full-width"
                        label="Email"
                        style={{ margin: 2 }}
                        placeholder="Enter Customer Email"
                        helperText="This field is required!"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                    />
                    <TextField
                        name="contact_number"
                        onChange={this.handleInputChange}
                        id="outlined-full-width"
                        label="Contact Number"
                        type="number"
                        style={{ margin: 2 }}
                        placeholder="Enter Customer Contact Number"
                        helperText="This field is required!"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                    />

                    <TextField
                        name="address"
                        onChange={this.handleInputChange}
                        id="outlined-multiline-static"
                        label="Multiline"
                        multiline
                        fullWidth
                        rows={4}
                        placeholder="Enter Customer Address"
                        helperText="This field is required"
                        variant="outlined"
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      startIcon={<SendIcon />}
                    >
                      Send
                    </Button>
                    {" "}
                    <Button
                      type="reset"
                      variant="contained"
                      color="primary"
                      endIcon={<RotateLeftIcon />}
                    >
                      Reset
                    </Button>
                
                      
                  </Grid>
                </form>
                <Grid item xs={6}>
                  
                </Grid>
              </Grid>
                
              
            </div>
        )
    }
}

