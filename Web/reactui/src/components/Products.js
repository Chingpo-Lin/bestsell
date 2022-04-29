import React, { Component } from 'react'

export default class Products extends Component {
  render() {
    return (
      <div>
        <ul className="products">
            {this.props.products.map((product) => (
                <li key={product.id}>
                    <div className="product">
                        <a href={"#" + product.id}>
                            {/* <img src={product.img} alt={product.name} /> */}
                            <p>
                                {product.name}
                            </p>
                        </a>
                        <div className="product-price">
                            <div>
                                {product.price}
                            </div>
                            <button className="button primary">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
      </div>
    )
  }
}
