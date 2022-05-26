import '../Login/Login.css';
import '../config/config.js';
import React, { Component } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

// * localhost:8080/pri/user/sell_product
// * post format:
// * product:  {
// *     "userId":1,
// *     "price":39.5,
// *     "img":"assssdadss",
// *     "description":"efe,lasdlxxf",
// *     "stock":0,
// *     "name":"cccsss",
// *     "categoryId":1
// * }

export default class SellProduct extends Component{
    constructor(props){
        super(props);
        this.state={
            price:"",
            img:[],
            description:"",
            stock:"",
            productName:"",
            categoryId:"-1",
            allCategories:[],
            imgPreview:"",
            showDialog:false,
            disableButton:false
        };
    }

    componentDidMount() {
        let session = Cookies.get('react-cookie-test');
        if(session){
            //get categories from server
            axios.get(global.AppConfig.serverIp+"/pub/category/get_all_category", { withCredentials: true })
            .then((response) => {
                console.log("get_category_Response",response.data);
                this.setState({
                    allCategories:response.data.data
                });
            })
            .catch(function (error) {
                console.log("get_category_error", error);
            })
        }
        else{
            window.location.href=global.AppConfig.webIp+"/login";
        }
    }

    handleChange = e => this.setState({[e.target.name]:e.target.value, error:""});

    uploadPicture = (e) => {
        this.setState({
            imgPreview : URL.createObjectURL(e.target.files[0]),
            img : e.target.files[0],
            error:""
        })
    };
    

    //sell product handler
    sellProduct = (e) =>{
        this.setState({disableButton:true});
        e.preventDefault();
        const{ price, img, description, stock, productName, categoryId } = this.state;
        if(!price||!img||!description||!stock||!productName||categoryId==="-1"){
            return this.setState({ error: "Fill all fields!" });
        }
        //send sell product request to server

        const json = JSON.stringify({
            "price": price,
            "description": description,
            "stock": stock,
            "img":"",
            "name":productName,
            "categoryId":categoryId
        });
        const product = new Blob([json], {
        type: 'application/json'
        });

        var bodyFormData = new FormData();
        bodyFormData.append("product", product);
        bodyFormData.append("file", img);

        console.log("form_image", img);
        axios.post(global.AppConfig.serverIp+"/pri/user/sell_product", bodyFormData,
            {
                headers:{'Content-Type':'application/json'},
                withCredentials: true
            }
        )
        .then(response => {
            if (response.data.code === 0) {
                //if post product success, redirect to home page
                console.log("sell_product_Reponse",response.data);
                this.setState({showDialog:true});
                setTimeout(function(){
                    window.location.href = global.AppConfig.webIp+"/";
                 }, 5000);
            }
            else{
                return this.setState({ error: response.data.msg });
            }
        })
        .catch(error => {
            console.log("sell_product_error", error);
        });
        this.setState({disableButton:false});
    };

    render(){
        console.log("image",this.state.img);
        return(
            <div className="grid-container">
                {this.state.showDialog ? (
                    <dialog id="sellDialog" open>
                        <p>Success! The product has been posted.</p>
                    </dialog>
                ):(
                    <></>
                )}
                <header>
                    <a href="/">BestSell</a>
                </header>
                <main>
                    <div id="signup-outer">
                        <div className="signup-wrapper">
                            <h1>Sell Product</h1>
                            <form onSubmit = {this.sellProduct}>
                                <label>
                                    <p>Product Name</p>
                                    <input type="text" name = "productName" onChange = {this.handleChange}/>
                                </label>
                                <label>
                                    <p>Price</p>
                                    <input type="text" name = "price" onChange = {this.handleChange}/>
                                </label>
                                <label>
                                    <p>Stock</p>
                                    <input type="text" name = "stock" onChange = {this.handleChange}/>
                                </label>
                                <label>
                                    <p>Category</p>
                                    <select name="categoryId" onChange={this.handleChange}>
                                        <option value="-1"> choose a category </option>
                                        {this.state.allCategories.map(categories => {
                                        return (
                                            <option value={categories.id}> {categories.name} </option>
                                        )
                                        })}
                                    </select>
                                </label>
                                <label>
                                    <p>Description</p>
                                    <input type="text" name = "description" onChange = {this.handleChange} />
                                </label>
                                <label>
                                    <p>Image</p>
                                    <input type="file" name="img" placeholder="Upload an image" onChange={this.uploadPicture}/>
                                </label>
                                <br/>
                                <img src={this.state.imgPreview} style={{ width: '300px' }} alt=""/>
                                {this.state.error&&(
                                    <div className = "has-text-danger"> { this.state.error }</div>
                                )}
                                <div id="submit">
                                    <button disabled={this.state.disableButton}>Submit</button>
                                </div>
                                <br/>
                            </form>
                        </div>
                    </div>
                </main>
                <footer>All right is reserved.</footer>
            </div>
        )
    }
}