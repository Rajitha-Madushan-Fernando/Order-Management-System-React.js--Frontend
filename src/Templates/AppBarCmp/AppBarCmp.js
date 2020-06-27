import React from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'; 
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { useHistory, Link } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({ 
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
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
 
  title: {
    flexGrow: 1,
  },
}));


export default function AppBarCmp(props) { 
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null); 
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleClose = () => {
    setAnchorEl(null);
    localStorage.clear();
    history.push('/signin'); 
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  

  const classes = useStyles(); 

  return (
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
          
          <Link to="/profile" className={classes.link}> <MenuItem >My Profile</MenuItem></Link>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>

      </Toolbar>
    </AppBar>
  );
}