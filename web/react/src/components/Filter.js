import React, { Component } from 'react'

export default class Filter extends Component {
  render() {
    return (
      <div className="filter">
          <div className="filter-result">{this.props.count} Products</div>
          <div className="filter-sort">
              Order{" "}
            <select value={this.props.sort} onChange={this.props.sortProducts}>
                <option>Latest</option>
                <option value="lowest">Lowest</option>
                <option value="highest">Highest</option>    
            </select></div>
          <div className="filter-size">
            Filter{" "}
            <select value={this.props.size} onChange={this.props.filterProducts}>
              <option value="">All</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option> 
              <option value="3">3</option> 
              <option value="4">4</option>
              <option value="6">6</option>              
            </select>              
          </div>
      </div>
    )
  }
}
