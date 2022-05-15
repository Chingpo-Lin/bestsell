import './App.css';
import './config/config.js';
import React from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import Products from "./components/Products";
import Filter from './components/Filter';
import CartModal from './components/CartModal';

export default class App extends React.Component {
  //create several attributes of state in a constructor
  constructor(){
    super();
    this.state = {
      products:[],
      // localStorage.getItem("cartItems")?
      //   JSON.parse(localStorage.getItem("cartItems")):[],
      size:"",
      sort:"",
      isLoggedIn: false,
      username:"",
      cartLength: 0,
    };
  }

  //check session and load products from server when homepage component is mounted
  componentDidMount() {
    let session = Cookies.get('react-cookie-test');
    if(session){
      this.setState({
        isLoggedIn: true
      })
    }

    axios.get(global.AppConfig.serverIp + "/pub/product/list_all_product")
      .then((response) => {
        console.log("List_All_Products_Response",response.data);
        this.setState({
          products:response.data.data
        })
      })
      .catch(function (error) {
        console.log("List_All_Products_Error",error);
      })

    //load cart from user & check login status
    axios.get(global.AppConfig.serverIp + "/pri/cart/get_cart_by_user", {withCredentials: true})
      .then((response) => {
        console.log("get_cart_by_user_response",response.data);
        if(response.data.code === -1){
          if(session){
            Cookies.remove('react-cookie-test');
            this.setState({
              isLoggedIn: false
            })
          }
        }
        else{
          let sum = 0;
          for (let i = 0; i < response.data.data.length; i++) {
            sum += response.data.data[i].count;
          }
          this.setState({
            cartLength:sum,
          })
        }
      })
      .catch(function (error) {
        console.log("Get_cart_by_user_Error",error);
      })
  }

  createOrder = (order) => {
    alert("Need to save order for " + order.name);
  }

  removeCount = (count) =>{
    this.setState({cartLength:count});
  }

  addToCart = (product) => {
    if(!this.state.isLoggedIn){
      //this will redirect user to login page if not logged in
      window.location.href=global.AppConfig.webIp+"/login";
    }
     else{
      axios.post(
        global.AppConfig.serverIp+"/pri/cart/add_to_cart",
        {
            "productId": product.id
        },
        {withCredentials: true}
      )
      .then(function (response){
        console.log("add_cart_response",response);
        if(response.data.code < 0){
          alert("Out of stock!");
        }
      })
      .catch(function (error){
        console.log("add_cart_error",error);
      })
      this.setState({ cartLength: this.state.cartLength+1 });
      
      // axios.post(global.AppConfig.serverIp+"/pri/cart/add_to_cart",  JSON.stringify({"productId": product.id },
      //   {'content-type' : 'application/json',
      //              'withCredentials': 'true'}
      // ),(err, response, body) => {
      //   if (err) throw err;
      //     body = JSON.parse(body)
      //     if(response.data.code !== -1){
      //       this.setState({ cartLength: this.state.cartLength + 1});
      //         }else{
      //           alert("Out of stock!");
      //         }
      //   console.log('response: ', response);
      // })
      // (async () => {
      //   const rawResponse = await fetch(global.AppConfig.serverIp+"/pri/cart/add_to_cart",{
      //     method:'POST',
      //     headers:{
      //       'Accept': 'application/json',
      //       'Content-Type':'application/json',
      //       'withCredentials': 'true'
      //     },
      //     body:JSON.stringify({"productId": product.id })
      //   });
        
      //   if (rawResponse.ok){
      //     if(rawResponse.data.code !== -1){
      //       this.setState({ cartLength: this.state.cartLength + 1});
      //     }else{
      //       alert("Out of stock!");
      //     }
      //   }
      // })
    }
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

  //handle login & logout button
  handleAuthButton  = () => {
    if(this.state.isLoggedIn){
      //request to logout user
      axios.get(global.AppConfig.serverIp+"/pri/user/logout", { withCredentials: true })
      .then((response) => {
        console.log("Logout_Response",response.data);
        Cookies.remove('react-cookie-test');
        this.setState({
          isLoggedIn: false,
          cartLength: 0
        });
      })
      .catch(function (error) {
          console.log("Logout_error", error);
      })
    }
    else{
      window.location.href=global.AppConfig.webIp+"/login";
    }
  }

  render(){
    console.log("cart: ", this.state.cart)
    console.log("cart items: ", this.state.cartItems)
    return (
      <div className="grid-container">
         <header>
            <a href="/">React Shopping Cart</a>
            <button className='loginButton' 
            onClick={this.handleAuthButton}>{this.state.isLoggedIn ? "logout" : "login"}</button>
             <div className='cart-icon'>
             {this.state.cartLength === 0? ( 
            <div className="cart-header">Cart is empty</div>
        ) : (
            <div className="cart-header">
                You have {this.state.cartLength} items in the cart{" "}
            </div>
        )}
            </div>
            <div className="sidebar">
                <CartModal 
                  createOrder={this.createOrder}
                  removeCount={this.removeCount}
                  />
              </div>
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
            </div> 
          </main>
          <footer>All right is reserved.</footer>
      </div>
   );
  }
}