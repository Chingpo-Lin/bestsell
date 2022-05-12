import React, { Component } from 'react'
import formatCurrency from '../util';

export default class Orders extends Component {
  render() {
      const { orders } = this.props;
    return !orders ? (
      <div>Orders</div>
    ) : (
        <div className='orders'>
            <h2>Orders</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADDRESS</th>
                        <th>ITEMS</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr>
                            <td>{order.id}</td>
                            <td>{order.createAt}</td>
                            <td>{formatCurrency(order.total)}</td>
                            <td>{order.name}</td>
                            <td>{order.email}</td>
                            <td>{order.address}</td>
                            <td>
                                {order.cartItems.map((item) => (
                                    <div>
                                        {item.count} {" x "} {item.name}
                                    </div>
                                ))}
                                </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
  }
}
