import React, { Component } from 'react'
import axios from 'axios';

export default class History extends Component {
    constructor(props){
        super(props);
        this.state = {
            sellProducts:[],
            orderProducts:[],
            orderHistory: true,
            sellHistory: false,
            order:[],
            Products:[]
        }
    }

    componentDidMount() {
        axios.get(global.AppConfig.serverIp + "/pri/user/list_product_by_user_id",{ withCredentials: true })
          .then((response) => {
            console.log("list_product_by_user_id_Response",response.data);
            this.setState({
              sellProducts:response.data.data
            })
            console.log("sell products: ", this.state.sellProducts);
          })
          .catch(function (error) {
            console.log("list_product_by_user_id_Error",error);
          })

          axios.get(global.AppConfig.serverIp + "/pri/order/get_product_in_order_history",{ withCredentials: true })
          .then((response) => {
            console.log("get_product_in_order_history_Response",response.data);
            this.setState({
              orderProducts:response.data.data
            })
            console.log("get_product_in_order_history: ", this.state.orderProducts);
          })
          .catch(function (error) {
            console.log("get_product_in_order_history_Error",error);
          })

        //   axios.get(global.AppConfig.serverIp + "/pub/product/list_all_product")
        //     .then((response) => {
        //     console.log("List_All_Products_Response",response.data);
        //     this.setState({
        //     Products:response.data.data,
        //     })
        //     })
        //     .catch(function (error) {
        //     console.log("List_All_Products_Error",error);
        //   })
          
        }

    sellHistory = ()=>{
        if (this.state.sellHistory === false){
            this.setState({
                sellHistory: true,
                orderHistory: false
            })
        }
    }

    orderHistory = ()=>{
        if (this.state.orderHistory === false){
            this.setState({
                orderHistory:true,
                sellHistory:false
            })
        }
    }   

  render() {
    return (
      <div className='HistoryPage'>
          <header>
          <a href='/'>Back to home</a>
          <div className='historyButton'>
          <button className='sellHistoryButton' onClick={this.sellHistory}>Sell History</button>
          <button className='orderHistoryButton' onClick={this.orderHistory}>Order History</button>
          </div>
        </header>
        <div className='History'>
          <div className='historyTitle'>
            {this.state.sellHistory ? (<div>Sell History</div>):(<div>Order History</div>)}
            </div>
            <div className='order1'>
            <ul className='ItemsInHistory'>
                {this.state.sellHistory && (this.state.sellProducts.map(item =>(
                    // <ul className='ItemsInHistory'>
                    <li key={item.id}>
                        <div>
                            <img width={"50rem"} src={item.img} alt="" />
                        </div>
                        <div>Name:{" "}{item.name}</div>
                        <div>Price:{" $"}{item.price}</div>
                        <div>Stock:{" "}{item.stock}</div>
                        <div>Create Date:{" "}{item.createDate}</div>
                        <div>Description:{" "}{item.description}</div>
                    </li>
                    // </ul>
                )))}
                
                {this.state.orderHistory && (this.state.orderProducts.map(item =>(
                    <li key={item.id}>
                        {/* {this.state.Products.filter(a => item.productId === a.id).map(product => (
                            <li key={item.productId}>
                                <div>Name:{" "}{product.name}</div>
                                <div>Price:{" $"}{product.price}</div>
                                <div>Count:{" "}{item.count}</div>
                                <div>Description:{" "}{product.description}</div>
                            </li>
                        ))} */}
                        {/* <li key={item.productId}> */}
                            <div>
                                <img className='orderPicture' width={"50rem"} src={item.img} alt="" />
                            </div>
                            <div>Name:{" "}{item.name}</div>
                            <div>Price:{" $"}{item.price}</div>
                            <div>Count:{" "}{item.count}</div>
                            <div>Create Date:{" "}{item.createTime}</div>
                            {/* <div>Description:{" "}{item.description}</div> */}
                        {/* </li> */}
                        {/* <div>Stock:{" "}{item.stock}</div> */}
                    </li>
                    )))} 
                    </ul>
                    {/* <div className='order2'>
                    <ul className='ItemsInHistory2'>
                    {this.state.orderHistory && (
                        this.state.order.map(item => (
                            <li key={item.id}>
                                <div>Count:{" "}{item.count}</div>
                                <div>Create Date:{" "}{item.createTime}</div>
                                <div>Description:{" "}{product.description}</div>
                            </li>
                        )) 
                    )
                    }
                    </ul>
                    </div> */}
            
            </div>
        </div>
      </div>
    )
  }
}
