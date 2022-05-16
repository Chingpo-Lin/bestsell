import './Login.css';
import '../config/config.js';
import React, { Component } from "react";
import axios from "axios";


export default class Registration extends Component{
    constructor(props){
        super(props);
        this.state={
            phone:"",
            name:"",
            address:"",
            password:"",
            repassword:""
        };
    }

    handleChange = e => this.setState({[e.target.name]:e.target.value, error:""});

    //signup handler
    signup = (e) =>{
        e.preventDefault();
        const{ phone, name, address, password, repassword } = this.state;
        if(!phone||!name||!address||!password||!repassword){
            return this.setState({ error: "Fill all fields!" });
        } else if(repassword !== password){
            return this.setState({ error: "Password and comfirm password does not match" });
        }
        //send signup request to server
        axios.post(
            global.AppConfig.serverIp+"/pri/user/signup",
            {
                "phone": phone,
                "name": name,
                "address": address,
                "pwd": password
            },
            {withCredentials: true}
        )
        .then(response => {
            if (response.data.code === 0) {
                //if signup success, redirect to login page
                console.log("Signup_Reponse",response.data);
                window.location.replace(global.AppConfig.webIp+"/login");
            }
            else{
                return this.setState({ error: response.data.msg });
            }
        })
        .catch(error => {
            console.log("signup_error", error);
        });
    };

    render(){
        return(
            <div className="grid-container">
                <header>
                    <a href="/">BestSell</a>
                </header>
                <main>
                    <div id="signup-outer">
                        <div className="signup-wrapper">
                            <h1>Register Account</h1>
                            <form onSubmit = {this.signup}>
                                <label>
                                    <p>Phone</p>
                                    <input type="tel" name = "phone" onChange = {this.handleChange}/>
                                </label>
                                <label>
                                    <p>Name</p>
                                    <input type="text" name = "name" onChange = {this.handleChange}/>
                                </label>
                                <label>
                                    <p>Address</p>
                                    <input type="text" name = "address" onChange = {this.handleChange}/>
                                </label>
                                <label>
                                    <p>Password</p>
                                    <input type="password" name = "password" onChange = {this.handleChange} />
                                </label>
                                <label>
                                    <p>Comfirm Password</p>
                                    <input type="password" name = "repassword" onChange = {this.handleChange} />
                                </label>
                                {this.state.error&&(
                                <div className = "has-text-danger"> { this.state.error }</div>
                                )}
                                <div id="submit">
                                    <button>Submit</button>
                                </div>
                            </form>
                            <p>By creating an account you agree to our <a href="/login">Terms & Privacy</a>.</p>
                        </div>
                    </div>
                </main>
                <footer>All right is reserved.</footer>
            </div>
        )
    }
}