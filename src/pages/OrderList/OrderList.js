import React, { Component } from "react";

import {
    Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper,Grid
    
} from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';

import DeleteIcon from '@material-ui/icons/Delete';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SearchIcon from '@material-ui/icons/Search';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import EditIcon from '@material-ui/icons/Edit';
import './OrderList.css'

import { appConfig } from '../../configs/app.config';
import utils from '../../helper/utils';
const { baseUrl } = appConfig;




export default class OrderList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            order: []
        };
    }

    componentDidMount() {
        this.findAllOrder();
    }

    findAllOrder() {
        axios.get(`${baseUrl}/order/list/`)
            /** .then(response => console.log(response.data));*/
            .then(response => response.data)
            .then((data) => {
                this.setState({ order: data });
            });
    }

    deleteOrder = (orderId) => {
        axios.delete(`${baseUrl}/order/delete/` + orderId)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "show": true });
                    setTimeout(() => this.setState({ "show": false }), 3000);
                    this.setState({
                        order: this.order.filter(order => order.id !== orderId)
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
            <Link to={"NewOrder"} >
            <Button
                variant="contained"
                color="secondary"
                className="new-order-add-button"
                startIcon={<CloudUploadIcon />}
                
            >
                New Order
            </Button>
            </Link>
            <br /><br /><br />
            <Grid item xs={12} sm={12}>
            <TableContainer component={Paper}>
                <Table className='order-table' aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#Order ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Code</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {
                            this.state.order.length === 0 ?
                                <TableRow align="center">
                                    <TableCell colSpan="6">No Orders Available</TableCell>
                                </TableRow> :
                                this.state.order.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>{order.id}</TableCell>
                                        <TableCell>{order.orderDate}</TableCell>
                                        <TableCell>{order.order_unique_id}</TableCell>
                                        <TableCell>{order.status === 1 ? <ThumbUpIcon /> : <ThumbDownIcon />}</TableCell>
                                        <TableCell style={{float:"right"}}>
                                            <Link to={"orderview/" + order.id} >
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    startIcon={<SearchIcon />}

                                                >
                                                    View
                                                </Button>
                                            </Link>
                                            {" "}
                                            <Link to={"UpdateOrder/" + order.id} >
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    startIcon={<EditIcon />}

                                                >
                                                    Edit
                                                </Button>
                                            </Link>
                                            {" "}
                                            <Link to={"ProductToOrder/" + order.id} >
                                            <Button
                                                variant="contained"
                                                color="default"
                                                size="small"
                                                startIcon={<PostAddIcon />}
                                            >
                                                Add products
                                            </Button>
                                            </Link>
                                            {" "}
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                                startIcon={<DeleteIcon />}
                                            >
                                                Delete
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