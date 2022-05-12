package com.webdesign.bestsell.dao;

import com.webdesign.bestsell.domain.Cart;
import com.webdesign.bestsell.domain.Product;
import org.apache.ibatis.annotations.Param;

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
     * @param cart
     * @return
     */
    int deleteCartByProductId(Cart cart);

    /**
     * add items to cart
     * @param cart
     * @return
     */
    int addToCart(Cart cart);

    /**
     * return the count of cart of given uid and pid
     * @param userId
     * @param productId
     * @return
     */
    Cart getCartCountByUidAndPid(@Param("userId") Integer userId, @Param("productId") Integer productId);

    /**
     * update the count of given cart
     */
    int updateCartCount(Cart cart);
}
