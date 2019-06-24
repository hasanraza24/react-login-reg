import React, { Component } from 'react';
import queryString from 'query-string';
import { postCallApi } from '../../utils/utils';
import { API_URL } from '../../constants/index';
import Snackbar from '../error-msgs-bsr/err-msg-bar';

class ResetPwd extends Component {
    constructor(props) {
        super(props);
        this.showError = React.createRef();
        this.state = {
            nShow: true,
            disable: true,
            email: '',
            verCode: ''
        }
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        this.setState({
            email: values.email,
            verCode: values.verCode
        })
      }

    showWarning = (e) => {
        if(e.target.value !== this.state.password) {
            this.setState({
                nShow: false,
                disable: true
            });
        }else {
            this.setState({
                nShow: true,
                disable: false
            });
        }
      }
      setPass = (e) => {
          this.setState({
              password: e.target.value
          })
      }

      resetPassword = (e) => {
        e.preventDefault();
        var email = this.state.email;
        var verCode = this.state.verCode;
        var password = document.getElementById("rpassword").value;
        postCallApi(`${API_URL}/users/reset-password`, {
          email: email,
          password: password,
          verCode: verCode
        }).then((data) => {
            if (data && data.success) {
                    this.showError.current.showSnackbar('Password Reset!');  
                    this.props.history.push({
                        pathname: '/',
                    }); 
            } else {
                this.showError.current.showSnackbar(data.message);
            }
        })
        .catch((error) => {
            alert('Something Went Wrong!');
        });
      }



    render() {
        return (
            <div>
                <div className="login">
                    <div className="container" style={{margin:'auto'}}>
                        <h1>Ceegees.</h1>
                        
                        <form id="lForm" name="contact-us-form" onSubmit={(e)=>this.resetPassword(e)}>
                            <input type="password" id="rpassword" onChange={(e) => this.setPass(e)} required placeholder="Password"/>
                            <input type="password" id="checkPassword" onChange={(e) => this.showWarning(e)} required placeholder="Repeat Password"/>
                            <mark style={{"marginLeft": "30px", "color": "red"}} className={ this.state.nShow ? "nShow": "" }>Password doen't match</mark>
                            <input type="submit" value="Sign Up" className={ this.state.disable ? "nDisble": "" } disabled={this.state.disable}/>
                        </form>
                    </div>
                </div>
                <Snackbar ref={this.showError} />
            </div>
        )
    }
}

export default ResetPwd;