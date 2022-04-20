package com.webdesign.bestsell.dao;

import com.webdesign.bestsell.domain.Cart;
import com.webdesign.bestsell.domain.Product;

import java.util.List;

public interface CartDao {

    /**
     * get cart by given user id
     * @param userId
     * @return
     */
    List<Cart> getCartByUserId(int userId);


}
