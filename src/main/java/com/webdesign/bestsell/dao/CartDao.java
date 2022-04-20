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

    /**
     * delete one product in cart by cart id
     * @param cartId
     * @return
     */
    int deleteCartByCartId(int cartId);

    /**
     * add items to cart
     * @param cart
     * @return
     */
    int addToCart(Cart cart);
}