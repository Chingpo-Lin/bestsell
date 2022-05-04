import './App.css';
import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from './components/Filter';
import Cart from './components/Cart';

export default class App extends React.Component {

  constructor(){
    super();
    this.state = {
      products:data.products,
      cartItems: [],
      size:"",
      sort:"",
    };
  }

  removeFromCart = (product) =>{
    const cartItems = this.state.cartItems.slice(); // .slice() - shallow copy
    this.setState({
      cartItems:cartItems.filter(x=>x.id !== product.id)
    })
    
  }

  addToCart = (product) => {
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
    this.setState({cartItems});
  }

  sortProducts = (event) => {
    //implement
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
  filterProducts = (event) => {
    //implement
    console.log(event.target.value);
    if(event.target.value === ""){
      this.setState({size: event.target.value, products:data.products});
    } else{
      this.setState ({
        size: event.target.value,
        products: data.products.filter( // filter array
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
          ),
      });
    }
  };

  render(){
    return (
      <div className="grid-container">
         <header>
            <a href="/">React Shopping Cart</a>
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
                          addToCart={this.addToCart} />
              </div>
              <div className="sidebar">
                <Cart 
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}/>
              </div>
            </div> 
          </main>
          <footer>All right is reserved.</footer>
      </div>
   );
  }
}
