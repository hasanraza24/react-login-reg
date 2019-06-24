import React, { Component } from 'react';

class Snackbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errMsg: ''
        }
    }

    showSnackbar = (errMsg) => {
        this.setState({
            errMsg
        })
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      }

    render() {
        return (
            <div id="snackbar" >{this.state.errMsg}</div>
        )
    }
}

export default Snackbar;