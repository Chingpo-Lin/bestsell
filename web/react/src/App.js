import './App.css';
import React from "react";
import Products from "./components/Products";
import Filter from './components/Filter';
import './config/config.js';
import axios from 'axios';
import { Navigate } from "react-router-dom"
import CartModal from './components/CartModal';

export default class App extends React.Component {
  //create several attributes of state in a constructor
  constructor(){
    super();
    this.state = {
      products:[],
      cartItems: localStorage.getItem("cartItems")?
        JSON.parse(localStorage.getItem("cartItems")):[],
      size:"",
      sort:"",
      isLoggedIn: false,
      user:{},
      token: "",
      redirectToLogin: false
    };
  }

  componentDidMount() {
    let api = global.AppConfig.serverIp + "/pub/product/list_all_product"
    axios.get(api)
        .then((response) => {

            let tempData = response.data
            console.log(tempData);
            this.setState({
              products:tempData.data
            })
        })
        .catch(function (error) {
            console.log(error);
        })
  }

  handleSuccessfulAuth = (responsedata) => {
    // sessionStorage.setItem('token', JSON.stringify(userToken));
    console.log(responsedata)
    window.sessionStorage.setItem("token", responsedata.token);
    this.setState({
      isLoggedIn: true,
      user: responsedata.user,
      redirectToLogin: false
    });
  }

  createOrder = (order) => {
    alert("Need to save order for " + order.name);
  }

  removeFromCart = (product) =>{
    const cartItems = this.state.cartItems.slice(); // .slice() - shallow copy
    this.setState({
      cartItems:cartItems.filter(x=>x.id !== product.id)
    })
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(x=>x.id !== product.id)));
  }

  addToCart = (product) => {
    // if(!this.state.isLoggedIn){
    //     this.setState({redirectToLogin:true}); //this will open login page on click of login button
    // }
    // else{
      const cartItems = this.state.cartItems.slice();
      let alreadyInCart = false;
      cartItems.forEach(item => {
        if (item.id === product.id){
          item.count++;
          alreadyInCart = true;
        }
      });
      if (!alreadyInCart){
        cartItems.push({...product, count: 1});
      }
      this.setState({ cartItems });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // }
  }

  //sort products in order of latest, lowest and highest
  sortProducts = (event) => {
    const sort = event.target.value;
    console.log(event.target.value);
    this.setState(state => ({
      sort: sort,
      products: this.state.products.slice().sort((a,b) =>(
        sort === "lowest"?
        ((a.price > b.price)? 1:-1):
        sort === "highest"?
        ((a.price < b.price)? 1:-1):
        ((a.id < b.id)? 1:-1)
      ))
    }))
  };

  //filter products in order of sizes
  filterProducts = (event) => {
    console.log(event.target.value);
    if(event.target.value === ""){
      this.setState({size: event.target.value, products:this.state.products});
    } else{
      this.setState ({
        size: event.target.value,
          products: this.state.products.filter( // filter array
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
          ),
      });
    }
  };

  render(){
    if(this.state.redirectToLogin){
      return <Navigate to='/login'/>;
    }
    return (
      <div className="grid-container">
         <header>
            <a href="/">React Shopping Cart</a>
            <a href={global.AppConfig.webIp+"/login"}><button>{this.state.isLoggedIn ? "logout" : "login"}</button></a>
            <CartModal 
              cartItems={this.state.cartItems}
              removeFromCart={this.removeFromCart}
              createOrder={this.createOrder}/>
          </header>
          <main> 
            <div className="content">
              <div className="main">
                <Filter count={this.state.products.length} 
                  size={this.state.size}
                  sort={this.state.sort}
                  filterProducts={this.filterProducts}
                  sortProducts={this.sortProducts} />
                <Products products={this.state.products} 
                          addToCart={this.addToCart}
                          isLoggedIn={this.state.isLoggedIn} />
              </div>
              {/* <div className="sidebar">
                <Cart 
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}
                  />
              </div> */}
            </div> 
          </main>
          <footer>All right is reserved.</footer>
      </div>
   );
  }
}