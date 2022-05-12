package com.webdesign.bestsell.service.impl;

import com.webdesign.bestsell.dao.CartDao;
import com.webdesign.bestsell.dao.OrderDao;
import com.webdesign.bestsell.dao.UserDao;
import com.webdesign.bestsell.domain.Cart;
import com.webdesign.bestsell.domain.Order;
import com.webdesign.bestsell.domain.User;
import com.webdesign.bestsell.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private CartDao cartDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private OrderDao orderDao;

    public static Map<String, User> sessionMap = new HashMap<>();

    @Override
    public List<User> listUser() {
        List<User> list = userDao.listUser();
        return list;
    }

    @Override
    public int signup(User user) {
        int row = userDao.signUpUser(user);
        return row;
    }

    @Override
    public User login(String phone, String pwd) {
        User user = userDao.login(phone, pwd);
        return user;
    }

    @Override
    public List<Cart> getCartByUserId(int userId) {
        return cartDao.getCartByUserId(userId);
    }

    @Override
    public int deleteItemFromCart(Cart cart) {
        return cartDao.deleteCartByProductId(cart);
    }

    @Override
    public int addToCart(Cart cart) {
        return cartDao.addToCart(cart);
    }

    @Override
    public int placeOrder(Order order) {
        return orderDao.placeOrder(order);
    }

    @Override
    public List<Order> getAllOrderByUserId(int userId) {
        return orderDao.getOrderByUserId(userId);
    }

    @Override
    public User findUserByPhone(String phone) {
        return userDao.findUserByPhone(phone);
    }

    @Override
    public Cart getCartByUserIdAndProductId(int userId, int productId) {
        return cartDao.getCartCountByUidAndPid(userId, productId);
    }

    @Override
    public int updateCartCount(Cart cart) {
        return cartDao.updateCartCount(cart);
    }


}
