import React, { Component } from "react";
import {
  Card, Button, CardActions, CardContent, Typography,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Grid,Container

} from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import EmailIcon from '@material-ui/icons/Email';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SystemUser from "../helper/user";


import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import UpdateIcon from '@material-ui/icons/Update';
import AppTemplate from "../Templates/AppTemplate/AppTemplate";
import { appConfig } from '../configs/app.config';
import utils from '../helper/utils';
const { baseUrl } = appConfig;

export default class OrderView extends Component {
  constructor(props) {

    super(props);
    this.state = {

    };

  }
  componentDidMount() {
    this.getUserDetails();

  }

  getUserDetails() {
    console.log(SystemUser.get())
    if (SystemUser.get() != null) {
      this.setState({
        id: SystemUser.get().id,
        name: SystemUser.get().name,
        email: SystemUser.get().email,
        username: SystemUser.get().username,


      });

    }

  };

  render() {
    const { name, email, username} = this.state;
    return (
      <AppTemplate >
        <Container maxWidth="sm" style={{float:"left"}}>
          <Card variant="outlined">
            <CardContent>
              <List >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountCircleIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={name} secondary="Full Name" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <EmailIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={email} secondary="Email Address" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PermIdentityIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={username} secondary="User Name" />
                </ListItem>
              </List>
            </CardContent>
            <CardActions>
              
            </CardActions>
          </Card>
        </Container>
       
      </AppTemplate>
    )
  }
}
