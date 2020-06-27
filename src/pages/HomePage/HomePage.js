import React, { Component } from 'react';
import Alert from '@material-ui/lab/Alert';
import SystemUser from "../../helper/user";
import { appConfig } from '../../configs/app.config';
import utils from '../../helper/utils';
import AppTemplate from '../../Templates/AppTemplate/AppTemplate';
const { baseUrl } = appConfig;


export default class HomePage extends Component {
  
  constructor(props) {
    super(props);
    this.state = { }; 
  }
  
  componentDidMount() {
    this.getUserDetails();
  }
  
  getUserDetails () {
    // console.log(SystemUser.get())
    if (SystemUser.get() != null) {
      this.setState({
        id: SystemUser.get().id,
        name: SystemUser.get().name,
        email: SystemUser.get().email
      });
    }
  };
  
  render() {
    const { name } = this.state;
    return (
      <div className="HomePage">
        <AppTemplate>
          <h1>Home page</h1>
        </AppTemplate>
      </div>
    )
  }
}