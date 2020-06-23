import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

import utils from '../helper/utils';
import { appConfig } from '../configs/app.config';
import tokens from "../helper/tokens";
import SystemUser from "../helper/user";
const { baseUrl } = appConfig;


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = (theme) => ({
  paper: {
    //marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: null,
      show: false,
      errors: {
        username: '',
        password: '',
      }
    }
    this.submitUser = this.submitUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  };

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }
  
  resetErrorState() {
    this.setState({
      errors: {
        username: '',
        password: '',
      }
    })
  }
  
  submitUser = event => {
    console.log('submit login');
    //userh.get()
    event.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    
    axios.post(`${baseUrl}/api/auth/signin`, user)
    .then(response => {
      tokens.save({ 'userType': 'user', 'token': response.data.accessToken });
      SystemUser.save(response.data.userData);
      utils.showError("Login Successfull");
      this.props.history.push('/');
    })
    .catch(_errors => {
      if (_errors.response) {
        const { status, data } = _errors.response;
        console.log('_errors.response', _errors.response);
        if (status == 401) {
          console.log('data.error', data.error);
          utils.showError("Bad Credintials");
        }
        else {
          let errorsObj = {}
          data.errors.forEach(error => {
            const { defaultMessage, field } = error
            errorsObj[field] = defaultMessage;
          })
          console.log(errorsObj);
          this.setState({ errors: errorsObj });
        }

      }
    });
  };


  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={this.submitUser}>
          

          <TextField
              name="username"
              id="outlined-full-width"
              label="User Name"
              style={{ margin: 2 }}
              placeholder="Enter Username"
              helperText={this.state.errors.username}
              onChange={this.handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
          />
          
           <TextField
              name="password"
              type="password"
              id="outlined-full-width"
              label="Password"
              style={{ margin: 2 }}
              placeholder="Enter Password"
              helperText={this.state.errors.password}
              fullWidth
              margin="normal"
              onChange={this.handleInputChange}
              variant="outlined"
            />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}> <Copyright /> </Box>
    </Container>
        
    )
  }
}

export default withStyles(useStyles)(SignIn);

