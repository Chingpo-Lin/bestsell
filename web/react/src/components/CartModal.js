import React, { Component } from 'react'
import Modal from "react-modal";
import Zoom from "react-reveal";
import formatCurrency from '../util'
import { Fade } from 'react-reveal';
import axios from 'axios';
import Cookies from 'js-cookie';

export default class CartModal extends Component {
    constructor(props){
      super(props);
      this.state = {
        product: null,
        name:"",
        email:"",
        address:"",
        showCheckout: false,
        click: false,
        userId: "",
        isLoggedIn: false,
        cartItems: [],
        cartLength:0,
        order:[],
        totalPrice:0,
        orderSuccessful:false,
        cart:[],
        disableButton:false
      };
    }

  //assign the input info to the corresponding attributes
  handleInput = (event) =>{
    this.setState({[event.target.name]:event.target.value });
  };

  removeFromCart = (product) =>{
    const cartItems = this.state.cartItems.slice().filter(x=>x.id !== product.id); // .slice() - shallow copy
    
    axios.post(
      global.AppConfig.serverIp+"/pri/cart/delete_cart",
      {
        "productId": product.id,
        "userId": this.state.userId
      },
      {withCredentials: true}
    )
    .then((response) => {
      console.log("remove_cart_response",response);
      const removedCount = this.state.cartLength - this.state.cart.find(e => e.productId === product.id).count;
      this.setState({
        cartItems:cartItems,
        cartLength:removedCount
      })
      this.props.removeCount(removedCount);
    })
    .catch(function (error){
      console.log("remove_cart_error",error);
    })
  }

  //create new order
  createOrder = (event) =>{
    event.preventDefault();
    const order = {
      name: this.state.name,
      phone: this.state.phone,
      address: this.state.address,
      cartItems: this.state.cartItems,
    };
    this.setState({order:  order})
  }

  openCart() {
    let session = Cookies.get('react-cookie-test');
    if(session){
      let sessionId = JSON.parse(session);
      this.setState({
        isLoggedIn: true,
        userId: sessionId.id,
        name:sessionId.name,
        phone:sessionId.phone,
        address:sessionId.address
      })
    }
    else{
      //this will redirect user to login page if not logged in
      window.location.href=global.AppConfig.webIp+"/login";
    }
    
    //load cart from user
    axios.get(global.AppConfig.serverIp + "/pri/cart/get_cart_by_user", {withCredentials: true})
      .then((response) => {
        console.log("get_cart_by_user_response",response.data);
        let sum = 0;
        for (let i = 0; i < response.data.data.length; i++) {
          sum += response.data.data[i].count;
        }
        this.setState({
          cart: response.data.data,
          cartLength:sum
        })
      })
      .catch(function (error) {
        console.log("get_cart_by_user_Error",error);
      })

    axios.get(global.AppConfig.serverIp + "/pri/cart/get_product_in_cart", {withCredentials: true})
      .then((response2) => {
        console.log("get_product_in_cart_response",response2.data);
        this.setState({
          cartItems: response2.data.data
        })
      })
      .catch(function (error) {
        console.log("get_product_in_cart_Error",error);
      })

    axios.get(global.AppConfig.serverIp + "/pri/order/get_total_price", {withCredentials: true})
      .then((response) => {
        console.log("get_total_price_response",response.data);
        this.setState({
          totalPrice: response.data.data
        })
      })
      .catch(function (error) {
        console.log("get_total_price_error",error);
      })
  }

  openModal = (product) => {
    this.setState({product, click: true});
  };

  closeModal = () => {
    this.setState({
      product: null,
      click: false,
      cartItems:[],
      cart:[],
      cartLength:0,
      showCheckout: false,
      orderSuccessful:false
    });
  };

  handleCheckOutButton = () => {
    this.setState({disableButton:true});
    axios.post(
      global.AppConfig.serverIp+"/pri/order/place_order", {}, {withCredentials: true}
    )
    .then((response)  => {
      console.log("place_order_response",response);
      this.setState({
        product: null,
        click: false,
        cartItems:[],
        cart:[],
        cartLength:0,
        orderSuccessful:true
      });
      this.props.removeCount(0);
    })
    .catch(function (error){
      console.log("place_order_error",error);
    })
    this.setState({disableButton:false});
  }

  render() {
    const {product} = this.state;
    const {click} = this.state;
    const {cartItems} = this.state;
    console.log("cartItems in CartModal: ", cartItems);
    return (
      <div>
        <div className='cart-icon'>
        {/* {typeof cartItems !== 'undefined' && cartItems.length === 0? ( 
            <div className="cart cart-header">Cart is empty</div>
        ) : (
            <div className="cart cart-header">
                You have {cartItems.length} items in the cart{" "}
            </div>
        )} */}
        <button className="cart-button"
            onClick={() => this.openCart() || this.openModal(product)}>
        <img src='./images/cart_icon.png' 
            alt=" " width={"65px"}
            />
        </button>
        </div>
        {click && (
          <Modal isOpen={true}
          aria-labelledby="contained-modal-title-vcenter"
            onRequestClose={this.closeModal}
            width={"100rem"}>
            <Zoom>
            <div className='cart cart-icon'>
             {this.state.cartLength <= 0? ( 
            <div className="cart-header">Cart is empty</div>
        ) : (
            <div className="cart-header">
                You have {this.state.cartLength} items in the cart{" "}
            </div>
        )}
            </div>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div>
             
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items">
                  {cartItems.map(item =>(
                      <li key={item.id}>
                          <div>
                              <img src={item.img} alt={item.name} />
                          </div>
                          <div>
                          <div>{item.name}</div>
                          <div className="right">
                            {formatCurrency(item.price)} x {this.state.cart.find(e => e.productId === item.id).count}{" "}
                            <button
                              className="button"
                              onClick={() => this.removeFromCart(item)}>
                             Remove   
                          </button>
                          </div>
                          
                          </div>
                      </li>
                  ))}
              </ul>
              </Fade>
              </div>  
              {this.state.cartLength !==0 && (
              <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total:{" "}{"$"}
                    {
                      this.state.totalPrice
                    // formatCurrency(
                    //   cartItems.reduce((a, c) => a + c.price * c.count, 0)
                    // )
                    }
                  </div>
                  <button
                    onClick={() => {
                      this.setState({showCheckout: true });
                    }}
                    className="proceed button">
                      Proceed
                  </button>
              </div>
              </div>
                {this.state.showCheckout && (
                  <Fade right cascade>
                  <div className="cart">
                  <form onSubmit={this.createOrder}>
                    <p>Check your information</p>
                    <ul className="form-container">
                      <li>
                        <label>Phone</label>
                        <p>{this.state.phone}</p>
                      </li>
                      <li>
                        <label>Name</label>
                        <p>{this.state.name}</p>
                      </li>
                      <li>
                        <label>Address</label>
                        <p>{this.state.address}</p>
                      </li>
                      <li>
                        <button className='proceed button' disabled={this.state.disableButton} onClick={this.handleCheckOutButton} >check out</button>
                      </li>
                    </ul>
                  </form>
                  </div>
                  </Fade>
                )}
                </div> 
              )}
        </div>
            </Zoom>
          </Modal>
        ) }

        {this.state.orderSuccessful &&
         (<Modal
          isOpen={true}
          aria-labelledby="contained-modal-title-vcenter"
          onRequestClose={this.closeModal}
            width={"100rem"}>
            <h1 className='order-successful'>Order Successful!</h1>
            <img className='successImg' src='../images/trueimg.png' alt='success'></img>
            <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
        </Modal>
        )}
        
      </div>
    )
  }
}
