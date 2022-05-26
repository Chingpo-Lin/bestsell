import React, { Component } from 'react'

export default class Filter extends Component {
  render() {
    return (
      <div className="filter">
          <div className="filter-result">{this.props.count} Products</div>
          <div className="filter-sort">
              Order{" "}
            <select value={this.props.sort} onChange={this.props.sortProducts}>
                <option value="latest">Latest</option>
                <option value="lowest">Lowest</option>
                <option value="highest">Highest</option>    
            </select></div>
          <div className="filter-size">
            Filter{" "}
            <select value={this.props.size} onChange={this.props.filterProducts}>
            <option value="">All</option>
            {this.props.category.map(categories => {
              return (
                <option value={categories.id}> {categories.name} </option>
              )
            })}        
            </select>              
          </div>
      </div>
    )
  }
}
