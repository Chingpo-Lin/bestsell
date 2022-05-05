import React, { Component } from 'react'
import formatCurrency from '../util';
import Fade from "react-reveal/Fade";

export default class Cart extends Component {
  constructor(props){
    super(props);
    this.state = {
      name:"",
      email:"",
      address:"",
      showCheckout: false};
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

  render() {
      const {cartItems} = this.props;
    return (
      <div>
        {cartItems.length === 0? ( 
            <div className="cart cart-header">Cart is empty</div>
        ) : (
            <div className="cart cart-header">
                You have {cartItems.length} items in the cart{" "}
            </div>
        )}
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
                    className="button primary">
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
                        <button className="button primary" type="submit">
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
      </div>
      
    )
  }
}
