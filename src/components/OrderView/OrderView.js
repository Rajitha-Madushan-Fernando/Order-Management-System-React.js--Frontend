import React, { Component } from "react";
import {
  Card, Button, ButtonGroup, CardActions, CardContent, Typography,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Grid

} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';

import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import UpdateIcon from '@material-ui/icons/Update';
import './OrderView.css' 

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

}));

export default class OrderView extends Component {

  constructor(props) {

    super(props);
    this.state = {
      orderDetails: [],
    };

  }


  componentDidMount() {
    const singleOrderId = +this.props.match.params.id;

    if (singleOrderId) {
      this.findOrderById(singleOrderId);
    }
  }

  findOrderById = (singleOrderId) => {
    axios.get("http://localhost:9090/springboot/order/list/" + singleOrderId)

      .then(response => {
        if (response.data != null) {
          const {
            id,
            customer,
            customer_address,
            customer_email,
            order_unique_id,
            remarks,
            status,
            orderDate,
            orderDetails
          } = response.data
          //console.log('orderDetails',orderDetails)
          this.setState({
            order_id: id,
            customer: customer.customer_name,
            customer_address: customer.address,
            customer_email: customer.email,
            contact_number: customer.contact_number,
            order_unique_id: order_unique_id,
            remarks: remarks,
            status: status,
            orderDate: orderDate,

            orderDetails: orderDetails

          });
          // this.setState({orderDetails:orderDetails})

        }


      }).catch((error) => {
        console.error("Error - " + error);
      });
  };

  updateProduct(id) {
    console.log('id', id)
  }


  render() {

    const { orderDetails, customer, customer_address, customer_email, contact_number } = this.state;
    //console.log('this.state', this.state)
    //console.log('orderDetails', orderDetails)
    // const orderList = []

    return (
      <div >
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Customer Details
                </Typography>
                <Typography variant="h5" component="h2">
                  {customer}
                </Typography>
                <Typography color="textSecondary">
                  {customer_address}
                </Typography>
                <Typography color="textSecondary">
                  {customer_email}
                </Typography>
                <Typography color="textSecondary">
                  {contact_number}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" size="small">
                  View More
                </Button>

              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Order Details
                </Typography>

                <Typography variant="h5" component="h2">
                  {this.state.orderDate}
                </Typography>

                <Typography color="textSecondary">
                  <Typography variant="caption" display="block" gutterBottom>
                    This is the order Id
                  </Typography>
                  {this.state.order_id}
                </Typography>

                <Typography variant="body2" component="p">
                  {this.state.remarks}
                </Typography>
                <br />
                {this.state.status === 1 ? <ThumbUpIcon /> : <ThumbDownIcon />}

              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <br />

        <Typography variant="h4" gutterBottom>
          Product List
        </Typography>


        <Grid item xs={8}>
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
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<UpdateIcon />}
                        href={"OrderProductEdit/" + eachRow.id}
                      >
                        Update
                      </Button>

                    </TableCell>
                  </TableRow>
                  )
                }, []
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

      </div>



    )
  }
}
