import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem'; 
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
// import Typography from '@material-ui/core/Typography';  
// import Drawer from '@material-ui/core/Drawer';
// import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Toolbar from '@material-ui/core/Toolbar';  
// import Divider from '@material-ui/core/Divider'; 
// import ListItemIcon from '@material-ui/core/ListItemIcon'; 
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
// import Grid from "@material-ui/core/Grid"; 
// import Axios from "axios"; 
// import clsx from 'clsx';     
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight'; 
import AppBarCmp from "../AppBarCmp/AppBarCmp";
import DrawerCmp from "../DrawerCmp/DrawerCmp"; 

const useStyles = makeStyles((theme) => ({ 
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function AppTemplate(props) {
  const { site } = props; 

  let [open, setOpen] = React.useState(false);
  const classes = useStyles();

  useEffect(() => {
    setOpen(true); // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
 

  return ( 
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.toolbar} /> 
        <h1>app template</h1>
        <CssBaseline />
        <AppBarCmp open={open} site={site} handleDrawerOpen={handleDrawerOpen}  />
        <DrawerCmp theme={theme} open={open} handleDrawerClose={handleDrawerClose}></DrawerCmp>
        {{...props.children}} 
      </main> 
    </div> 
  );
}