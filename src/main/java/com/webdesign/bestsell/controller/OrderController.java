package com.webdesign.bestsell.controller;

import com.webdesign.bestsell.domain.Cart;
import com.webdesign.bestsell.domain.Order;
import com.webdesign.bestsell.domain.Product;
import com.webdesign.bestsell.domain.model.OrderDisplay;
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
     * get product in current user's order
     * localhost:8080/pri/cart/get_product_in_cart
     * @return
     */
    @GetMapping("get_product_in_order_history")
    public JsonData getProductInOrderHistory() {

        int uid = LoginInterceptor.currentUserID;
        if (uid == -1) {
            return JsonData.buildError("Not looged in");
        }

        List<Order> orderList = userService.getAllOrderByUserId(uid);

        List<OrderDisplay> orderDisplayList = new ArrayList<>();
        for (Order order: orderList) {
            int productId = order.getProductId();
            Product product = productService.getProductById(productId);

            OrderDisplay orderDisplay = new OrderDisplay();

            orderDisplay.setCount(order.getCount());
            orderDisplay.setCreateTime(order.getCreateTime());
            orderDisplay.setImg(product.getImg());
            orderDisplay.setName(product.getName());
            orderDisplay.setPrice(product.getPrice());

            orderDisplayList.add(orderDisplay);
        }
        return JsonData.buildSuccess(orderDisplayList);
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
            order.setCount(cart.getCount());

            // if there is items left
            Product product = productService.getProductById(productId);
            if (product.getStock() < order.getCount()) {
                return JsonData.buildError("no item left!");
            }

            // update items stock
            product.setStock(product.getStock() - order.getCount());
            int row = productService.updateStock(product);
            if (row <= 0) {
                return JsonData.buildError("error when attempt to get item");
            }

            int result = userService.placeOrder(order);
            if (result <= 0) { return JsonData.buildError("error when place order");}

            userService.deleteItemFromCart(cart);
            orderList.add(order);
        }

        return JsonData.buildSuccess(orderList);
    }

    /**
     * get the total price
     * localhost:8080/pri/order/get_total_price
     * @return
     */
    @GetMapping("get_total_price")
    public JsonData getTotalPrice() {

        int uid = LoginInterceptor.currentUserID;
        if (uid == -1) {
            return JsonData.buildError("Not looged in");
        }

        List<Cart> cartList = userService.getCartByUserId(uid);
        double totalPrice = 0;

        for (Cart cart: cartList) {
            totalPrice += productService.getProductById(cart.getProductId()).getPrice() * cart.getCount();
        }
        return JsonData.buildSuccess(totalPrice);
    }
}
