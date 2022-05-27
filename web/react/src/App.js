import './App.css';
import './config/config.js';
import React from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import Products from "./components/Products";
import Filter from './components/Filter';
import CartModal from './components/CartModal';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default class App extends React.Component {
  //create several attributes of state in a constructor
  constructor(){
    super();
    this.state = {
      allProducts:[],
      products:[],
      // localStorage.getItem("cartItems")?
      //   JSON.parse(localStorage.getItem("cartItems")):[],
      size:"",
      sort:"latest",
      isLoggedIn: false,
      username:"",
      cartLength: 0,
      showDialog: false,
      dialogMessage:"",
      allCategories:[]
    };
  }

  //check session and load products from server when homepage component is mounted
  componentDidMount() {
    let session = Cookies.get('react-cookie-test');
    if(session){
      let sessionId = JSON.parse(session);
      this.setState({
        isLoggedIn: true,
        username:sessionId.name
      })
    }

    axios.get(global.AppConfig.serverIp + "/pub/product/list_all_product")
      .then((response) => {
        console.log("List_All_Products_Response",response.data);
        let sortedProducts = response.data.data.slice().sort((a,b) =>(
          ((a.id < b.id)? 1:-1)
        ))
        this.setState({
          products:sortedProducts,
          allProducts:sortedProducts
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
      .then((response) => {
        console.log("add_cart_response",response);
        if(response.data.code < 0){
          this.setState({dialogMessage:response.data.msg, showDialog:true});
          setTimeout(()=>{
            this.setState({showDialog:false});
          }, 3000);
        }
        else{
          this.setState({cartLength: this.state.cartLength+1, dialogMessage:"Product Added!", showDialog:true});
          setTimeout(()=>{
            this.setState({showDialog:false});
          }, 2000);
        }
      })
      .catch(function (error){
        console.log("add_cart_error",error);
      })
    }
  }

  styles = theme => ({
    badge: {
      top: '50%',
      right: -3,
      // The border color match the background color.
      border: `2px solid ${
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
      }`,
    },
  });

  //sort products in order of latest, lowest and highest
  sortProducts = (event) => {
    const sort = event.target.value;
    this.setState({
      sort: sort,
      products: this.state.products.slice().sort((a,b) =>(
        sort === "lowest" ?
        ((a.price > b.price)? 1:-1):
        sort === "highest" ?
        ((a.price < b.price)? 1:-1):
        ((a.id < b.id)? 1:-1)
      ))
    })
  };

  //filter products in order of sizes
  filterProducts = (event) => {
    let products = this.state.allProducts;
    this.setState({
      size: event.target.value,
      sort: "lastest",
      products: event.target.value === "" ? this.state.allProducts : products.filter((product) => product.categoryId === parseInt(event.target.value))
    });
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
    return (
      <div className="grid-container">
        {this.state.showDialog ? (
          <dialog id="errorDialog" open>
            <h3>{this.state.dialogMessage}</h3>
          </dialog>
        ):(
          <></>
        )}
        <header>
          <a href="/">BestSell</a>
          {this.state.isLoggedIn ? (
            <>
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
            <div className="navbar">
              <div className="dropdown">
                <button className="dropbtn"> {this.state.username}
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  <a href="/Sell">Sell Product</a>
                  <a href="/History">Order{" & "}Sell History</a>
                  <button className="logout-button" onClick={this.handleAuthButton}>
                    <ExitToAppIcon fontSize="medium"/> 
                    Logout</button>
                </div>
              </div>
            </div>
            </>
          ) : (
            <button className='loginButton' onClick={this.handleAuthButton}>login</button>
          )}
        </header>
        <main> 
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length} 
                size={this.state.size}
                sort={this.state.sort}
                category={this.state.allCategories}
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