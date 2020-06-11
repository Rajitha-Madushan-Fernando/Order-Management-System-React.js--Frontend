import React,{ Component } from "react";

import { 
        Card ,Button , ButtonGroup,
        Table,TableBody,TableCell,
        TableContainer,TableHead,TableRow,Paper
} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';

import ListIcon from '@material-ui/icons/List';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
});


export default class CustomerList extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            customer: []
        };
    }

    componentDidMount() {
       this.findAllCustomers();
    }

    findAllCustomers(){
        axios.get("http://localhost:9090/springboot/customer/list")
        /** .then(response => console.log(response.data));*/
        .then(response => response.data)
        .then((data) => {
            this.setState({ customer: data });
        });
    }

    deleteCustomer = (customerId) => {
        axios.delete("http://localhost:9090/springboot/customer/delete/"+customerId)
        .then(response => {
            if( response.data != null){
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}),3000);
                    this.setState({
                        customer:this.customer.filter(customer => customer.id !== customerId)    
                    });
             }
             else{
                this.setState({"show":false});
            }

        });
            
    };
   
    render(){
        const classes = useStyles();
        return(
            
            <TableContainer component={Paper}>
                <Table aria-label="customized table" className={classes.table}>
                    <TableHead>
                        <TableRow style={{backgroundColor:'#2196f3', color: '#fafafa'}} variant="head">
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
                            this.state.customer.map((customer) =>(
                                <TableRow key={customer.id}>
                                    <TableCell>{customer.customer_name}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>{customer.address}</TableCell>  
                                    <TableCell>{customer.contact_number}</TableCell>  
                                    <TableCell>{customer.cus_unique_id}</TableCell>  
                                    <TableCell>
                                        <ButtonGroup>
                                        <Link to={"edit/"+customer.id} >
                                            <Button 
                                                size="sm" 
                                                variant="outline-danger" 
                                                >
                                                    <EditIcon/>
                                            </Button>
                                        </Link>{' '}
                                            <Button size="sm" variant="outline-danger" onClick={this.deleteCustomer.bind(this,customer.id)}><DeleteForeverIcon/></Button>
                                        </ButtonGroup>    
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

