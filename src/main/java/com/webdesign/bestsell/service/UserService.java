package com.webdesign.bestsell.service;

import com.webdesign.bestsell.domain.Cart;
import com.webdesign.bestsell.domain.Order;
import com.webdesign.bestsell.domain.User;

import java.util.List;

public interface UserService {

    List<User> listUser();

    int signup(User user);

    User login(String phone, String pwd);

    List<Cart> getCartByUserId(int userId);

    int deleteItemFromCart(Cart cart);

    int addToCart(Cart cart);

    int placeOrder(Order order);

    List<Order> getAllOrderByUserId(int userId);

    User findUserByPhone(String phone);

    Cart getCartByUserIdAndProductId(int userId, int productId);

    int updateCartCount(Cart cart);
}
