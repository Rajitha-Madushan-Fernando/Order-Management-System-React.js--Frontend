import { toast } from 'react-toastify'; 
import numeral from 'numeral';

toast.configure();
const utils = { 
	showError: (msg) => {
		toast(msg)
		console.error('Error Message',msg);
	},
	showMsg: (msg) => {
		toast(msg)
		console.log('Message',msg);
	},
	showSuccess: (msg) => {
		toast(msg)
		console.log('Message',msg);
	},
	emptyToNull: (value) => {
		return value === ''?null:value;
	},
	//  10 => 10.00
	numberFormat: (rowNumber, withDecimal = true) => {
		if (withDecimal) {
			return numeral(rowNumber).format('0,0.00');
		} 
		return numeral(rowNumber).format('0,0');
	},
	redirect: (value = '/') => {
		window.location = value;
	},
	
}
export default utils