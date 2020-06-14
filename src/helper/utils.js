//import { toast } from 'react-toastify';
import numeral from 'numeral';
import React from 'react';

// toast.configure();
const utils = {
    loadingShow: () => {
        //events.dispatch('showLoading',()=>{}) 
    },
    loadingHide: () => {
        //events.dispatch('hideLoading') 
    },
    showError: (msg) => {
        /////////toast(msg)
    },
    showMsg: (msg) => {
        //toast(msg)
        console.log('Message',msg);
    },
    showSuccess: (msg) => {
        //toast(msg)
        console.log('Message',msg);
    },
    //  10 => 10.00
    numberFormat: (rowNumber, withDecimal = true) => {
        if (withDecimal) {
            return numeral(rowNumber).format('0,0.00');
        }

        return numeral(rowNumber).format('0,0');
    },

}
export default utils