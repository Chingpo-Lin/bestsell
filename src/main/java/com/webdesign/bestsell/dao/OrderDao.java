package com.webdesign.bestsell.dao;

import com.webdesign.bestsell.domain.Cart;
import com.webdesign.bestsell.domain.Order;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OrderDao {

    /**
     * get order by user id
     * @param userId
     * @return
     */
    List<Order> getOrderByUserId(@Param("userId") int userId);

    /**
     * place order
     * @param order
     * @return
     */
    int placeOrder(Order order);
}
