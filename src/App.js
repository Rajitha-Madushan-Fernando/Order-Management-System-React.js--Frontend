import React, { useState, useEffect } from "react"; 
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Router, Switch, Route, Link, useHistory } from 'react-router-dom';  
import 'react-toastify/dist/ReactToastify.css'; 
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
import LoadingSpinner from './Components/LoadingSpinner/LoadingSpinner';

import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import Profile from './Profile/Profile';
import { interceptor } from './interceptor'; 

import utils from './helper/utils'; 

const drawerWidth = 240; 
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },   
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));



export default function App (props) {
  const history = useHistory();
  const [isHideSpinner, setIsHideSpinner] = useState(0);  
  const authExList = []
  
  // this way equal to componentDidMount()
  useEffect(() => {  
    setIsHideSpinner(true);
    // this way equal to componentWillMount()
    interceptor(authExList, (authData)=>{ 
      const {loaderIsHide, redirectTo} = authData;
      setIsHideSpinner(loaderIsHide);    
      if(redirectTo!=''){
        history.push(redirectTo);
      }
    });
  },[]);
  
  const { window } = props;
  const classes = useStyles();   

  const container = window !== undefined ? () => window().document.body : undefined;

  return ( 
    <Router history={history}>
      <Switch> 
        <Route path="/" exact component={SignIn} />
        <Route exact path="/signin" component={SignIn} />
        {/* <Route path="/home" exact component={HomePage} /> */}
        <Route exact path="/customer" component={CustomerList} />
        <Route exact path="/product" component={ProductList} />
        <Route exact path="/order" component={OrderList} />
        <Route exact path="/order-view/:id" component={OrderView} />
        <Route exact path="/order-product-edit/:id" component={OrderProductEdit} />
        <Route exact path="/new-customer" component={NewCustomer} />
        <Route exact path="/update-customer/:id" component={NewCustomer} />
        <Route exact path="/new-product" component={NewProduct} />
        <Route exact path="/update-product/:id" component={NewProduct} />
        <Route exact path="/new-order" component={NewOrder} />
        <Route exact path="/update-order/:id" component={NewOrder} />
        <Route exact path="/product-to-order/:id" component={ProductToOrder} />
        <Route exact path="/edit-product-to-order/:id" component={EditOrderProduct} />
        <Route exact path="/signup" component={SignUp} />
        <Route path="/profile" component={Profile} />
        <Route component={ErrorPage} />
      </Switch>
      {isHideSpinner?'':<LoadingSpinner />}
    </Router>  
  );
}
 