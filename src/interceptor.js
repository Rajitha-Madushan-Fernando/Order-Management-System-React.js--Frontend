import axios from 'axios';
import { Promise } from "es6-promise";
import { TokenStorage } from "./token-storage";
import { createBrowserHistory } from "history";
import tokens from './helper/tokens'; 

export const interceptor =  function(excludeUrl, cb) { 

    console.log('init');
    axios.interceptors.request.use((request) => { 
      console.log('request',request);
        cb({loader:false, redirectTo:''})
        const urlObj = new URL(request.url);
        if(excludeUrl.indexOf(urlObj.pathname)<0){
            const token = tokens.get('token');
            const authuser = tokens.get('userType');
            // console.log('token',token);
            request.headers['Authorization'] = `Bearer ${token}`;
            request.headers['Authorization-authuser'] = `${authuser}`;
            // console.error('urlObj.pathname  ',urlObj.pathname, );
        }
        else{
            
        }
        // Return a successful response back to the calling service
        return request;
    });

    axios.interceptors.response.use(
        (response) => {
            console.log('response', response);
            // Return a successful response back to the calling service
            cb({loader:true, redirectTo:''})
            return response;
        },
        (error) => {
            
            // Return any error which is not due to authentication back to the calling service
            if (error.response.status !== 401) {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
            else {
                alert('Unauthorized')
                // console.log('error.response',error.response);
                // console.log('Index of message',error.response.data.path.indexOf("api/auth/signin"));
                // if(error.response.data.path.indexOf("api/auth/signin") < 0){ 
                //     cb({loader:true, redirectTo:'/SignIn'})
                // }
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }

        }
    );
}