
import React from 'react';

import '../config/config.js';

import axios from 'axios';



class Welcome extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            welcome_list:[]
        };
    }

    componentDidMount() {
        let api = global.AppConfig.serverIp + "/pub/product/list_all_product"

        // const axios = require('axios');

        axios.get(api)
            .then((response) => {
                console.log(response.data);

                let tempData = response.data

                this.setState({
                    welcome_list:tempData
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        console.log(this.state.welcome_list);
        return (
          <div>welcome to{this.state.welcome_list}</div>
        );
    }
}

export default Welcome;