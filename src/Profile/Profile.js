import React, { Component } from "react";
import {
  Card, Button, CardActions, CardContent, Typography,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Grid

} from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import UpdateIcon from '@material-ui/icons/Update';

import { appConfig } from '../configs/app.config';
import utils from '../helper/utils';
const { baseUrl } = appConfig;


export default class OrderView extends Component {
  constructor(props) {

    super(props);
    this.state = {
      
    };

  }

  render() {
    return (
      <div >
       
      </div>
    )
  }
}
