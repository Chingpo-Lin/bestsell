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
      cartItems:[],
      // localStorage.getItem("cartItems")?
      //   JSON.parse(localStorage.getItem("cartItems")):[],
      size:"",
      sort:"",
      isLoggedIn: false,
      username:"",
      sessionId: "",
      cartLength: 0
    };
  }

  //check session and load products from server when homepage component is mounted
  componentDidMount() {
    let sessionId = Cookies.get('react-cookie-test');
    if(sessionId){
      this.setState({
        isLoggedIn: true,
        sessionId: sessionId
      })
    }

    axios.get(global.AppConfig.serverIp + "/pub/product/list_all_product",
    )
      .then((response) => {
        console.log("List_All_Products_Reponse",response.data);
        this.setState({
          products:response.data.data
        })
      })
      .catch(function (error) {
        console.log("List_All_Products_Error",error);
      })

    //load cart from user

    axios.get(global.AppConfig.serverIp + "/pri/cart/get_product_in_cart", {withCredentials: true})
      .then((response) => {
        if(!this.state.isLoggedIn){
          //this will redirect user to login page if not logged in
          window.location.href=global.AppConfig.webIp+"/login";
        }
        console.log("Get_cart_item",response.data);
        this.setState({
          cartItems:response.data.data,
          cartLength:response.data.data.length
        })
      })
      .catch(function (error) {
        console.log("Get_cart_item_Error",error);

      })
  }

  createOrder = (order) => {
    alert("Need to save order for " + order.name);
  }

  removeFromCart = (product) =>{
    const cartItems = this.state.cartItems.slice(); // .slice() - shallow copy
    axios.post(
      global.AppConfig.serverIp+"/pri/cart/delete_cart",
      {
        "productId": product.id,
        "userId": 14
      },
      {withCredentials: true}
  )
  .then(function (response){
    console.log(response);
  })
  .catch(function (error){
    console.log(error);
  }) 
    this.setState({
      cartItems:cartItems.filter(x=>x.id !== product.id),
      cartLength:this.state.cartLength - 1
    })
    // localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(x=>x.id !== product.id)));
  }

  addToCart = (product) => {
    if(!this.state.isLoggedIn){
      //this will redirect user to login page if not logged in
      window.location.href=global.AppConfig.webIp+"/login";
    }
     else{ 
      const cartItems = this.state.cartItems.slice();
      let alreadyInCart = false;
      if (cartItems !==""){
      cartItems.forEach(item => {
        if (item.id === product.id){
          item.count++;
          alreadyInCart = true;
        }
      });
    }

      if (!alreadyInCart){
        axios.post(
          global.AppConfig.serverIp+"/pri/cart/add_to_cart",
          {
              "productId": product.id
          },
          {withCredentials: true}
      )
      .then(function (response){
        console.log(response);
        cartItems.push({product, count: 1});
      })
      .catch(function (error){
        console.log(error);
      })
        
      }
      this.setState({ cartItems:cartItems, cartLength:this.state.cartLength+1 });
      // localStorage.setItem("cartItems", JSON.stringify(cartItems));
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
        console.log("Logout_Reponse",response.data);
        Cookies.remove('react-cookie-test');
        this.setState({
          isLoggedIn: false,
          sessionId: ""
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
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}
                  cartLength={this.state.cartLength}
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