package com.webdesign.bestsell.service.impl;

import com.webdesign.bestsell.dao.CartDao;
import com.webdesign.bestsell.dao.OrderDao;
import com.webdesign.bestsell.dao.UserDao;
import com.webdesign.bestsell.domain.Cart;
import com.webdesign.bestsell.domain.Order;
import com.webdesign.bestsell.domain.User;
import com.webdesign.bestsell.service.UserService;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
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
    public String login(String phone, String pwd) {
        User user = userDao.login(phone, pwd);
        System.out.println(user == null);
        System.out.println(phone);
        if (user != null) {
            String token = UUID.randomUUID().toString();
            System.out.println(token);
            sessionMap.put(token, user);
            return token;
        } else {
            return null;
        }
    }

    @Override
    public List<Cart> getCartByUserId(int userId) {
        return cartDao.getCartByUserId(userId);
    }

    @Override
    public int deleteItemFromCart(int cardId) {
        return cartDao.deleteCartByCartId(cardId);
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
}
