import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer, List, ListItem,
  ListItemIcon, ListItemText,  
  Hidden, Divider
} from '@material-ui/core';
import { Link } from "react-router-dom";  
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import StorefrontIcon from '@material-ui/icons/Storefront'; 
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'; 
import Axios from 'axios';

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
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  
}));




export default function AppBarCmp(props) {
  const classes = useStyles(); 
  
  const theme = props.theme;
  //const [tags, setTags] = useState(false); 
  //const {REACT_APP_API_BASE_URL} = process.env;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // const fetchData = () => {  
  //   Axios.get(`${ REACT_APP_API_BASE_URL }`)
  //   .then((response)=> { 
  //     setTags(response.data);
  //   })
  // } 
  
  // const urls = [
  //   { name:'textToHash2',   url:'/textToHash' },
  //   { name:'trending',      url:'/page/trending' },
  //   { name:'tipsToTrend',   url:'/page/tipsToTrend' },
  //   { name:'hashTagFollow', url:'/page/hashTagFollow'}
  // ]

  useEffect(() => {
    // setOpen(true);
    //fetchData()  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  

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

          <Link to="/customer" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary={"Customers"} />
            </ListItem>
          </Link>

          <Link to="/product" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <StorefrontIcon />
              </ListItemIcon>
              <ListItemText primary={"Products"} />
            </ListItem>
          </Link>

          <Link to="/order" className={classes.link}>
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
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { window } = props;

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
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
  );
}