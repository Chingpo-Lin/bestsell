package com.webdesign.bestsell.controller;

import com.webdesign.bestsell.domain.Cart;
import com.webdesign.bestsell.domain.Order;
import com.webdesign.bestsell.domain.Product;
import com.webdesign.bestsell.service.ProductService;
import com.webdesign.bestsell.service.UserService;
import com.webdesign.bestsell.utils.JsonData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
        int id = 1;
        List<Order> orderList = userService.getAllOrderByUserId(id);
        System.out.println(orderList);
        return JsonData.buildSuccess(orderList);
    }

    /**
     * place order
     * localhost:8080/pri/order/place_order
     * format:
     * {
     *     "userId":2,
     *     "productId":2
     * }
     * @param order
     * @return
     */
    @PostMapping("place_order")
    public JsonData placeOrder(@RequestBody Order order) {

        order.setCreateTime(new Date());

        int productId = order.getProductId();

        // if there is items left
        Product product = productService.getProductById(productId);
        if (product.getStock() <= 0) {
            return JsonData.buildError("no item left!");
        }

        // if item is from current user
        List<Product> products = productService.getProductByUserId(order.getUserId());
        for (Product p: products) {
            if (p.getId() == productId) {
                return JsonData.buildError("It's your item!");
            }
        }

        // TODO
        // remove items from user cart


        // update items stock
        product.setStock(product.getStock() - 1);
        System.out.println(product.getStock());
        int row = productService.updateStock(product);
        if (row <= 0) {
            return JsonData.buildError("error when attempt to get item");
        }
        row = userService.placeOrder(order);

        return row > 0 ? JsonData.buildSuccess(order): JsonData.buildError("success place");
    }

    // TODO
    // check out (calculate total cost)
}
