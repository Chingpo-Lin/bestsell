import React, { Component } from "react";
import axios from "axios";
import './Login.css';
// import data from "/Users/zhihaolin/Desktop/coen275/bestsell/web/react/src/data.json";

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            username:"",
            password:""
        };
    }
    handleChange = e => this.setState({[e.target.name]:e.target.value, error:""});
    login = (e) =>{
        e.preventDefault();
        const{ username, password } = this.state;
        if(!username||!password){
            return this.setState({ error: "Fill all fields!" });
        }
        axios.post(
            "http://localhost:8080/pri/user/login",
            {
                user: {
                    username: username,
                    password: password
                }
            },
            { withCredentials: true }
        )
        .then(response => {
            console.log(response);
            if (response.data.login) {
            this.props.handleSuccessfulAuth(response.data);
            }
            else{
                return this.setState({ error: response.data.msg });
            }
        })
        .catch(error => {
            console.log("login error", error);
        });
    };
    render(){
        return(
            <div id="outer">
            <div className="col-md-3 login-wrapper">
            <h1>Please Log In</h1>
            <form style={{ marginLeft: "0 auto" }} onSubmit = { this.login }>
                <label>
                <p>Username</p>
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
            </div>
            </div>
        )
    }
}