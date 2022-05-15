import React, { Component } from 'react'
import formatCurrency from '../util';
import axios from 'axios';
import Cookies from 'js-cookie';

export default class Orders extends Component {
    constructor(props){
        super(props);
        this.state = {
            userInfo:{
                id:"",
                name:"",
                address:"",
                phone:""
            }
        }
    }

componentDidMount() {
    let session = Cookies.get('react-cookie-test');
    if(session){
        let sessionInfo = JSON.parse(session);
        console.log(sessionInfo);
        //get categories from server
        this.setState({userInfo: sessionInfo});
        console.log(this.state);
    }
    else{
        window.location.href=global.AppConfig.webIp+"/login";
    }
}

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
                        {/* <th>TOTAL</th> */}
                        <th>NAME</th>
                        <th>Phone</th>
                        <th>ADDRESS</th>
                        {/* <th>ITEMS</th> */}
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr>
                            <td>{this.state.userInfo.id}</td>
                            <td>{"2022"}</td>
                            {/* <td>{formatCurrency(order.total)}</td> */}
                            <td>{this.state.userInfo.name}</td>
                            <td>{this.state.userInfo.phone}</td>
                            <td>{this.state.userInfo.address}</td>
                            {/* <td>
                                {order.cartItems.map((item) => (
                                    <div>
                                        {item.count} {" x "} {item.name}
                                    </div>
                                ))}
                                </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
  }
}
