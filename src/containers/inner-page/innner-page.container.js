import React, { Component } from 'react';


class InnerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        console.log("you are in inner page"); 
        return (
            <h3>You are now logged In!</h3>
        )
    }
}

export default InnerPage;