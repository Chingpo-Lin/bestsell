import React, { Component } from 'react'
import Modal from "react-modal";
import Zoom from "react-reveal";
import formatCurrency from '../util'
import { Fade } from 'react-reveal';
import axios from 'axios';

export default class CartModal extends Component {
    constructor(props){
        super(props);
        this.state = {
        product: null,
        name:"",
        email:"",
        address:"",
        showCheckout: false,
        click: false};
    }  

    getProductById(productId){
      axios.get(global.AppConfig.serverIp + "/pub/product/get_product_by_id",{
        params: {
          "productId": productId
        }
      })
        .then((response) => {
          console.log("get_product_by_id",response.data);
          this.setState({
            cartItems:response.data.data
          })
        })
        .catch(function (error) {
          console.log("get_product_by_id_Error",error);
        })
    }  

    //assign the input info to the corresponding attributes
  handleInput = (event) =>{
    this.setState({[event.target.name]:event.target.value });
  };

  //create new order
  createOrder = (event) =>{
    event.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
    };
    this.props.createOrder(order);
  }

    openModal = (product) => {
        this.setState({product});
        this.setState({click: true});
    };
    closeModal = () => {
        this.setState({product: null});
        this.setState({click: false});
    };

  render() {
      const {product} = this.state;
      const {click} = this.state;
      const {cartItems} = this.props;
    return (
      <div>
        <div className='cart-icon'>
        {cartItems.length === 0? ( 
            <div className="cart cart-header">Cart is empty</div>
        ) : (
            <div className="cart cart-header">
                You have {cartItems.length} items in the cart{" "}
            </div>
        )}
        <button className="cart-button"
            onClick={() => this.openModal(product)}>
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
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div>
              {cartItems.length === 0? ( 
            <div className="cart cart-header">Cart is empty</div>
        ) : (
            <div className="cart cart-header">
                You have {cartItems.length} items in the cart{" "}
            </div>
        )}
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
                            {formatCurrency(item.price)} x {item.count}{" "}
                            <button 
                              className="button"
                              onClick={() => this.props.removeFromCart(item)}>
                             Remove   
                          </button>
                          </div>
                          
                          </div>
                      </li>
                  ))}
              </ul>
              </Fade>
              </div>  
              {cartItems.length !==0 && (
              <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total:{" "}
                    {formatCurrency(
                      cartItems.reduce((a, c) => a + c.price * c.count, 0)
                    )}
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
                    <ul className="form-container">
                      <li>
                        <label>Email</label>
                        <input 
                        name="email"
                        type="email" 
                        required 
                        onChange={this.handleInput} />
                      </li>
                      <li>
                        <label>Name</label>
                        <input 
                        name="name"
                        type="text" 
                        required 
                        onChange={this.handleInput} />
                      </li>
                      <li>
                        <label>Address</label>
                        <input 
                        name="address"
                        type="text" 
                        required 
                        onChange={this.handleInput} />
                      </li>
                      <li>
                        <button className="checkout button" type="submit">
                          Checkout
                        </button>
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
        )}
      </div>
    )
  }
}
