import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {
  Drawer, List, ListItem,
  ListItemIcon, ListItemText, AppBar, Toolbar,
  IconButton, Typography, CssBaseline,
  Hidden, Divider, Button
} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import StorefrontIcon from '@material-ui/icons/Storefront';
import MenuIcon from '@material-ui/icons/Menu';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AccountCircle from '@material-ui/icons/AccountCircle';

import CustomerList from './pages/CustomerList/CustomerList';
import ProductList from './pages/ProductList/ProductList';
import HomePage from './pages/HomePage/HomePage';
import OrderList from './pages/OrderList/OrderList';
import OrderView from './pages/OrderView/OrderView';
import OrderProductEdit from './pages/OrderProductEdit/OrderProductEdit';
import NewCustomer from './pages/NewCustomer/NewCustomer';
import NewProduct from './pages/NewProduct/NewProduct';
import NewOrder from './pages/NewOrder/NewOrder';
import ProductToOrder from './pages/ProductToOrder/ProductToOrder';
import EditOrderProduct from './pages/EditOrderProduct/EditOrderProduct';
import ErrorPage from './pages/ErrorPage/ErrorPage';

import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import Profile from './Profile/Profile';
import { interceptor } from './interceptor';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawerPaper: { width: 'inherit' },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
}));



function App(props) {
  const history = useHistory();
  console.log('history', history);
  const [count, setCount] = useState(0);

  // componentWillMount(() => {
  //   const authExList = []
  //   interceptor(authExList, (data)=>{ 
  //     if(data.redirectTo!='') {
  //       history.push(data.redirectTo)
  //     }
  //   });

  // });

  // useEffect(() => { 
  //   const authExList = []
  //   interceptor(authExList, (data)=>{ 
  //     if(data.redirectTo!='') {
  //       //history.push(data.redirectTo)
  //     }
  //   });
  // });


  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>

      <Drawer
        style={{ width: '240px' }}
        variant="persistent"
        anchor="left"
        open={true}
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <Link to="/" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
          </Link>

          <Link to="/Customer" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary={"Customers"} />
            </ListItem>
          </Link>

          <Link to="/Product" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <StorefrontIcon />
              </ListItemIcon>
              <ListItemText primary={"Products"} />
            </ListItem>
          </Link>

          <Link to="/Order" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <AddShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary={"Orders"} />
            </ListItem>
          </Link>

        </List>

      </Drawer>
    </div >
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.title}>
              Order Management system
            </Typography>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleClick}
              
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              
              <Link to="/Profile" className={classes.link}> <MenuItem onClick={handleClose}>My Profile</MenuItem></Link>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>

          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route exact path="/Customer" component={CustomerList} />
            <Route exact path="/Product" component={ProductList} />
            <Route exact path="/Order" component={OrderList} />
            <Route exact path="/OrderView/:id" component={OrderView} />
            <Route exact path="/OrderProductEdit/:id" component={OrderProductEdit} />
            <Route exact path="/NewCustomer" component={NewCustomer} />
            <Route exact path="/UpdateCustomer/:id" component={NewCustomer} />
            <Route exact path="/NewProduct" component={NewProduct} />
            <Route exact path="/UpdateProduct/:id" component={NewProduct} />
            <Route exact path="/NewOrder" component={NewOrder} />
            <Route exact path="/UpdateOrder/:id" component={NewOrder} />
            <Route exact path="/ProductToOrder/:id" component={ProductToOrder} />
            <Route exact path="/EditProductToOrder/:id" component={EditOrderProduct} />
            <Route path="/SignIn" component={SignIn} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/Profile" component={Profile} />
            <Route component={ErrorPage} />
          </Switch>

        </main>

      </div>
    </Router>

  );
}

export default App;
