package com.webdesign.bestsell.controller;

import com.webdesign.bestsell.domain.Cart;
import com.webdesign.bestsell.domain.Order;
import com.webdesign.bestsell.domain.Product;
import com.webdesign.bestsell.interceptor.LoginInterceptor;
import com.webdesign.bestsell.service.ProductService;
import com.webdesign.bestsell.service.UserService;
import com.webdesign.bestsell.utils.JsonData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/pri/order")
public class OrderController {

    @Autowired
    public UserService userService;

    @Autowired
    public ProductService productService;

    /**
     * get order of given user
     * localhost:8080/pri/order/get_user_order
     * @return
     */
    @GetMapping("get_user_order")
    public JsonData getOrderByUserId() {

        int uid = LoginInterceptor.currentUserID;
        if (uid == -1) {
            return JsonData.buildError("Not looged in");
        }

        List<Order> orderList = userService.getAllOrderByUserId(uid);
        System.out.println(orderList);
        return JsonData.buildSuccess(orderList);
    }

    /**
     * place order
     * localhost:8080/pri/order/place_order
     * @return
     */
    @PostMapping("place_order")
    @Transactional
    public JsonData placeOrder() {

        int uid = LoginInterceptor.currentUserID;
        if (uid == -1) {
            return JsonData.buildError("Not looged in");
        }

        List<Order> orderList = new ArrayList<>();
        Order order = null;

        List<Cart> cartList = userService.getCartByUserId(uid);
        for (Cart cart: cartList) {
            int productId = cart.getProductId();
            order = new Order();
            order.setUserId(uid);
            order.setProductId(productId);
            order.setCreateTime(new Date());

            // if there is items left
            Product product = productService.getProductById(productId);
            if (product.getStock() <= 0) {
                return JsonData.buildError("no item left!");
            }

            // update items stock
            product.setStock(product.getStock() - 1);
            int row = productService.updateStock(product);
            if (row <= 0) {
                return JsonData.buildError("error when attempt to get item");
            }

            int result = userService.placeOrder(order);
            if (result <= 0) { return JsonData.buildError("error when place order");}

            userService.deleteItemFromCart(cart.getId());
            orderList.add(order);
        }

        return JsonData.buildSuccess(orderList);
    }

    /**
     * checkout and get the total price
     * localhost:8080/pri/order/checkout
     * @return
     */
    @GetMapping("checkout")
    public JsonData checkOut() {

        int uid = LoginInterceptor.currentUserID;
        if (uid == -1) {
            return JsonData.buildError("Not looged in");
        }

        List<Cart> cartList = userService.getCartByUserId(uid);
        double totalPrice = 0;
        for (Cart cart: cartList) {
            totalPrice += productService.getProductById(cart.getProductId()).getPrice();
        }
        return JsonData.buildSuccess(totalPrice);
    }
}
