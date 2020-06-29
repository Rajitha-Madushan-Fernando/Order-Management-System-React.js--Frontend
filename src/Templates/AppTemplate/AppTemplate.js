import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
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
      <CssBaseline />
      <AppBarCmp open={open} site={site} handleDrawerOpen={handleDrawerOpen}  />
      <DrawerCmp theme={theme} open={open} handleDrawerClose={handleDrawerClose}></DrawerCmp>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {{...props.children}} 
      </main>
    </div>  
  );
}