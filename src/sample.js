import React from "react";
import { makeStyles } from "@material-ui/core/styles" ;
import { BrowserRouter as Router, Switch,Route, Link} from 'react-router-dom';
import { Drawer,List, ListItem, ListItemIcon,ListItemText ,Container }  from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import StorefrontIcon from '@material-ui/icons/Storefront';

import CustomerList from './components/CustomerList';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  
    drawerPaper: { width: 'inherit'},
    link: { 
      textDecoration: 'none',
      color: theme.palette.text.primary 
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
  },
}))

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div style= {{ display : "flex"}}>
        <Drawer
          style ={{ width : '240px'}}
          variant = "persistent"
          anchor="left"
          open ={true}
          classes = {{ paper: classes.drawerPaper}}
        >
          <List>
            <Link to="/" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary= {"Home"}/>
              </ListItem>
              </Link>
              
              <Link to="CustomerList" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary= {"Customers"}/>
              </ListItem>
              </Link>

              <Link to="/allproducts" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <StorefrontIcon />
                </ListItemIcon>
                <ListItemText primary= {"Products"}/>
              </ListItem>
              </Link>
          </List>
        </Drawer>
        <Container>
        <Switch>
          <Route exact path="/" />
          <Route exact path="/CustomerList" component={CustomerList} />
          <Route exact path="/allproducts" />
        </Switch>
        </Container>
        
      </div>
    </Router>
    
  );
}

export default App;
