import './Login.css';
import '../config/config.js';
import React, { Component } from "react";
import axios from "axios";
import Cookies from 'js-cookie';


export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            username:"",
            password:""
        };
    }

    handleChange = e => this.setState({[e.target.name]:e.target.value, error:""});

    //login handler
    login = (e) =>{
        e.preventDefault();
        const{ username, password } = this.state;
        if(!username||!password){
            return this.setState({ error: "Fill all fields!" });
        }
        //send login request to server
        axios.post(
            global.AppConfig.serverIp+"/pri/user/login",
            {
                "phone": username,
                "pwd": password
            },
            {withCredentials: true}
        )
        .then(response => {
            if (response.data.code === 0) {
                //if login success, set cookie and redirect to homepage
                console.log("Login_Response",response.data);
                Cookies.set("react-cookie-test",JSON.stringify(response.data.data),{expires: 1});
                window.location.replace(global.AppConfig.webIp);
            }
            else{
                return this.setState({ error: response.data.msg });
            }
        })
        .catch(error => {
            console.log("login_error", error);
        });
    };

    render(){
        return(
            <div className="grid-container">
                <header>
                    <a href="/">BestSell</a>
                </header>
                <main>
                    <div id="login-outer">
                        <div className="login-wrapper">
                            <h1>Please Log In</h1>
                            <form onSubmit = {this.login}>
                                <label>
                                    <p>Phone</p>
                                    <input type="text" name = "username" onChange = {this.handleChange}/>
                                </label>
                                <label>
                                    <p>Password</p>
                                    <input type="password" name = "password" onChange = {this.handleChange} />
                                </label>
                                {this.state.error&&(
                                <div className = "has-text-danger"> { this.state.error }</div>
                                )}
                                <div id="submit">
                                    <button>Submit</button>
                                </div>
                            </form>
                            <div className="form_text">
                                <p>Don't have an account? </p>
                                <a className="form_link" href="/Registration" id="linkCreateAccount">Sign up here</a>
                            </div>
                        </div>
                    </div>
                </main>
                <footer>All right is reserved.</footer>
            </div>
        )
    }
}