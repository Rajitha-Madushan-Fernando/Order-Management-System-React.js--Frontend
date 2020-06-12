import React, { Component } from "react";

import {
    Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';

import DeleteIcon from '@material-ui/icons/Delete';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SearchIcon from '@material-ui/icons/Search';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import './OrderList.css'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});



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
        axios.get("http://localhost:9090/springboot/order/list")
            /** .then(response => console.log(response.data));*/
            .then(response => response.data)
            .then((data) => {
                this.setState({ order: data });
            });
    }

    deleteOrder = (orderId) => {
        axios.delete("http://localhost:9090/springboot/order/delete/" + orderId)
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
                                        <TableCell>
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
                                            <Button
                                                variant="contained"
                                                color="default"
                                                size="small"
                                                startIcon={<PostAddIcon />}
                                            >
                                                Add products
                                        </Button>
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
        )
    }
}