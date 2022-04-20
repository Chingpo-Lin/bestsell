package com.webdesign.bestsell.service;

import com.webdesign.bestsell.domain.Cart;
import com.webdesign.bestsell.domain.User;

import java.util.List;

public interface UserService {

    List<User> listUser();

    int signup(User user);

    String login(String phone, String pwd);

    List<Cart> getCartByUserId(int userId);

    int deleteItemFromCart(int cartId);
}
