import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import axios from "axios";
import SendIcon from "@material-ui/icons/Send";
import { Link } from 'react-router-dom';
import utils from "../helper/utils";
import { appConfig } from "../configs/app.config";
import tokens from "../helper/tokens";
const { baseUrl } = appConfig;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = (theme) => ({
  paper: {
    //marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      username: null,
      password: null,
      show: false,
      errors: {
        name: "",
        email: "",
        username: "",
        password: "",
      },
    };
    this.registerUser = this.registerUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  resetErrorState() {
    this.setState({
      errors: {
        name: "",
        email: "",
        username: "",
        password: "",
      },
    });
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  registerUser = (event) => {
    event.preventDefault();

    const user = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      role: ["user"],
      password: this.state.password,
    };
    axios
      .post(`${baseUrl}/api/auth/signup`, user)
      .then((response) => {
        //this.setState({ "show": false });
        utils.showSuccess("User Saved Successfully.");
        this.resetErrorState();
      })
      .catch((_errors) => {
        if (_errors.response) {
          const { errors } = _errors.response.data;
          let errorsObj = {};
          errors.forEach((error) => {
            const { defaultMessage, field } = error;
            errorsObj[field] = defaultMessage;
          });
          console.log(errorsObj);
          this.setState({ errors: errorsObj });
        }
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} onSubmit={this.registerUser}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    id="outlined-full-width"
                    label="Full Name"
                    style={{ margin: 2 }}
                    placeholder="Enter Full Name"
                    helperText={this.state.errors.name}
                    fullWidth
                    onChange={this.handleInputChange}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    id="outlined-full-width"
                    label="Email"
                    style={{ margin: 2 }}
                    placeholder="Enter Email"
                    helperText={this.state.errors.email}
                    fullWidth
                    onChange={this.handleInputChange}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="username"
                    id="outlined-full-width"
                    label="User Name"
                    style={{ margin: 2 }}
                    placeholder="Enter Username"
                    helperText={this.state.errors.username}
                    fullWidth
                    onChange={this.handleInputChange}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    helperText={this.state.errors.password}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="Keep Logged In"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                 <Link to={"signin"} >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </div>
    );
  }
}
export default withStyles(useStyles)(SignUp);
