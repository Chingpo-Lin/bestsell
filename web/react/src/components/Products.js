import React, { Component } from 'react'
import formatCurrency from '../util'
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal";

export default class Products extends Component {
  constructor(props){
    super(props);
    this.state = {
      product: null,

    }
  }

  openModal = (product) => {
    this.setState({product});
  };
  closeModal = () => {
    this.setState({product: null});
  };

  render() {
    const {product} = this.state; 
    return (
      <div>
        {/* fade animation */}
        <Fade bottom cascade={true}> 
        <ul className="products">
            {this.props.products.map(product => (
                <li key={product.id}>
                    <div className="product">
                        <a href={"#" + product.id} onClick={() => this.openModal(product)}>
                            <img src={product.img} alt={product.name}  className="img" />
                            <p>
                                {product.name}
                            </p>
                        </a>
                        <div className="product-price">
                            <div>{formatCurrency(product.price)}</div>
                            <button onClick={()=> this.props.addToCart(product)} className="button primary">Add to Cart</button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
        </Fade>
        {product && (
          <Modal isOpen={true}
            onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="product-details">
                <img src={product.img} alt={product.name} />
                <div className="product-details-description">
                  <p>
                    <strong>{product.name}</strong>
                  </p>
                  <p>
                    {product.description}
                  </p>
                  <p>
                    Available sizes:{" "}
                    {product.availableSizes.map((x) => (
                      <span>
                        {" "}
                        <button className="button">{x}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                      <div>{formatCurrency(product.price)}</div>
                      <button className="button primary" onClick={() => {
                        this.props.addToCart(product);
                        this.closeModal();
                      }}> Add To Cart</button>
                  </div>    
                  </div>  
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    )
  }
}
