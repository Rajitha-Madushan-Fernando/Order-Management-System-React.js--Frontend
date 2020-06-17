
import React ,{Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

export default  class CustomMessage extends Component {
    

    render() {
        const toastCss = {
            position: "fixed",
            top:'80px',
            right:'10px',
            zIndex:'1',
        };
        return (
            <div style={this.props.show ? toastCss : null}>
                <Alert variant="filled" severity="success">
                    {this.props.message}
                </Alert>
            </div>
        )
    }

}
