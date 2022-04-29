import React, { Component } from 'react'
import formatCurrency from '../util'

export default class Products extends Component {
  render() {
    return (
      <div>
        <ul className="products">
            {this.props.products.map((product) => (
                <li key={product.id}>
                    <div className="product">
                        <a href={"#" + product.id}>
                            <img src={product.img} alt={product.name}  className="img" />
                            <p>
                                {product.name}
                            </p>
                        </a>
                        <div className="product-price">
                            <div>{formatCurrency(product.price)}</div>
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
