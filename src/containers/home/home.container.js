import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postCallApi } from '../../utils/utils';
import {  API_URL } from '../../constants/index';
import '../../assets/css/home.css';
import Snackbar from '../error-msgs-bsr/err-msg-bar';

class Home extends Component {
  constructor(props) {
    super(props);
    this.showError = React.createRef();
    this.state = {
        loginFormOpen: 'login',
        nShow: true,
        disable: true,
        password: ''
    }
  }

  registerUser = (e) =>{
    e.preventDefault();
    var email = document.getElementById("remail").value;
    var password = document.getElementById("rpassword").value;
    var passwordCheck = document.getElementById("checkPassword").value;
    var name = document.getElementById('rname').value;
    if(passwordCheck !== password){
      alert("Passwords doesn't match");
      return;
    }

    postCallApi(`${API_URL}/users/register`, {
      name: name,  
      email: email,
      password: password
  }).then((data) => {
      if (data.success) {
        this.setState({
            loginFormOpen: 'login'
        })
          // document.getElementById("myForm").reset();        
      } else {
        this.showError.current.showSnackbar(data.message);
      }
  })
  .catch((error) => {
    alert('Something Went Wrong!');
  });
  }

  loginUser = (e) =>{
      console.log('login');
    e.preventDefault();
    var email = document.getElementById("lemail").value;
    var password = document.getElementById("lpassword").value;
    postCallApi(`${API_URL}/users/login`, {
      email: email,
      password: password
  }).then((data) => {
      if (data && data.success) {
              localStorage.setItem("token", data.data.token);
              localStorage.setItem("username", data.data.user._id);
              this.props.history.push({
                pathname: '/inner-page',
            });
          // document.getElementById("myForm").reset();          
      } else {
        this.showError.current.showSnackbar(data.message);
      }
  })
  .catch((error) => {
    alert('Something Went Wrong!');
  });
  }

  togglePopup = (formName) => {
    this.setState({
      loginFormOpen : formName
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
  forgotPwd = (e) => {
    e.preventDefault();
    var email = document.getElementById("femail").value;
    postCallApi(`${API_URL}/users/forgot-pwd`, {
      email: email
    }).then((data) => {
        this.showError.current.showSnackbar(data.message);
        this.setState({
            loginFormOpen: 'login'
        });
    })
    .catch((error) => {
       alert('Something Went wrong!');
    });
  }

  render() {
    return (
      <div>  
        <div className="App">
            {this.state.loginFormOpen==='login' && <div className="login">
            <div className="container" style={{margin:'auto'}}>
            <h1>Ceegees.</h1>
            
            <form id="rForm" name="contact-us-form" onSubmit={(e)=>this.loginUser(e)}>
                <input type="email" required id="lemail" placeholder="Email"/>
                <input type="password" required id="lpassword" placeholder="Password"/>
                <mark style={{marginLeft: "208px", color: "blue", cursor: "pointer"}} onClick={() => this.togglePopup('forgot')} >Forgot Password?</mark>
                <p ref='wrongpassword' style={{ fontFamily: "Lato",color: "#2a0ad0",fontSize: "15px",marginTop:8, fontWeight:600, textAlign:"center" }}></p>
                <input type="submit" value="Sign In"/>
                <p>Don't have an account? <span onClick = {()=>this.togglePopup('register')}>Register Now</span></p>
            </form>
            </div>
            </div>}
            {this.state.loginFormOpen==='register' && <div className="login">
            <div className="container" style={{margin:'auto'}}>
            <h1>Ceegees.</h1>
            
            <form id="lForm" name="contact-us-form" onSubmit={(e)=>this.registerUser(e)}>
                <input type="text" id="rname" required placeholder="Name"/> 
                <input type="email" id="remail" required placeholder="Email"/>
                <input type="password" id="rpassword" onChange={(e) => this.setPass(e)} required placeholder="Password"/>
                <input type="password" id="checkPassword" onChange={(e) => this.showWarning(e)} required placeholder="Repeat Password"/>
                <mark style={{"marginLeft": "30px", "color": "red"}} className={ this.state.nShow ? "nShow": "" }>Password doen't match</mark>
                <input type="submit" value="Sign Up" className={ this.state.disable ? "nDisble": "" } disabled={this.state.disable}/>
                <p>Already have an account? <span onClick = {() => this.togglePopup('login')}>Login Now</span></p>
            </form>
            </div>
            </div>}
            {this.state.loginFormOpen==='forgot' && <div className="login">
            <div className="container" style={{margin:'auto'}}>
            <h1>Ceegees.</h1>
            
            <form id="fForm" name="contact-us-form" onSubmit={(e)=>this.forgotPwd(e)}>
                <input type="email" id="femail" required placeholder="Email"/>
                <input type="submit" value="Submit"/>
            </form>
            </div>
            </div>}
        </div>
        <Snackbar ref={this.showError} />
    </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      dispatch: dispatch
  }
};
export default connect(state => state, mapDispatchToProps)(Home);