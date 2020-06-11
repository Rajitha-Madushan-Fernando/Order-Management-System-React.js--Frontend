import React from "react";
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {
  Drawer, List, ListItem,
  ListItemIcon, ListItemText,
  Container, AppBar, Toolbar,
  IconButton, Typography, CssBaseline,
  Hidden,Divider
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import StorefrontIcon from '@material-ui/icons/Storefront';
import MenuIcon from '@material-ui/icons/Menu';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';


import CustomerList from './components/CustomerList/CustomerList';
import ProductList from './components/ProductList/ProductList';
import HomePage from './components/HomePage/HomePage';
import OrderList from './components/OrderList/OrderList';
import OrderView from './components/OrderView/OrderView';
import OrderProductEdit from './components/OrderProductEdit/OrderProductEdit';

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
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

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
            <Typography variant="h6" noWrap>
              Order Management system
            </Typography>
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
          </Switch>
        </main>

      </div>
    </Router>

  );
}

export default App;
