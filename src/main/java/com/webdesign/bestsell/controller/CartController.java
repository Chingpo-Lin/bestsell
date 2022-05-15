package com.webdesign.bestsell.controller;

import com.webdesign.bestsell.domain.Cart;
import com.webdesign.bestsell.domain.Product;
import com.webdesign.bestsell.interceptor.LoginInterceptor;
import com.webdesign.bestsell.service.ProductService;
import com.webdesign.bestsell.service.UserService;
import com.webdesign.bestsell.utils.JsonData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/pri/cart")
public class CartController {

    @Autowired
    public UserService userService;

    @Autowired
    public ProductService productService;

    /**
     * get cart in current user's cart
     * localhost:8080/pri/cart/get_cart_by_user
     * @return
     */
    @GetMapping("get_cart_by_user")
    public JsonData getCartByUserId() {

        int uid = LoginInterceptor.currentUserID;
        if (uid == -1) {
            return JsonData.buildError("Not looged in");
        }

        List<Cart> cartList = userService.getCartByUserId(uid);

//        List<Product> productList = new ArrayList<>();
//        for (Cart cart: cartList) {
//            int productId = cart.getProductId();
//            productList.add(productService.getProductById(productId));
//        }
        return JsonData.buildSuccess(cartList);
    }

    /**
     * get product in current user's cart
     * localhost:8080/pri/cart/get_product_in_cart
     * @return
     */
    @GetMapping("get_product_in_cart")
    public JsonData getProductInCart() {

        int uid = LoginInterceptor.currentUserID;
        if (uid == -1) {
            return JsonData.buildError("Not looged in");
        }

        List<Cart> cartList = userService.getCartByUserId(uid);

        List<Product> productList = new ArrayList<>();
        for (Cart cart: cartList) {
            int productId = cart.getProductId();
            productList.add(productService.getProductById(productId));
        }
        return JsonData.buildSuccess(productList);
    }



    /**
     * delete cart by cart id
     * localhost:8080/pri/cart/delete_cart
     * @return
     */
    @PostMapping("delete_cart")
    public JsonData deleteCartByProductId(@RequestBody Cart cart) {

        // TODO
        // set userId to cart
        int uid = LoginInterceptor.currentUserID;
        cart.setUserId(uid);

        System.out.println(cart);
        int row = userService.deleteItemFromCart(cart);
        return JsonData.buildSuccess(row);
    }

    /**
     * add item to current user's cart
     * localhost:8080/pri/cart/add_to_cart
     * format:
     * {
     *     "userId":1,
     *     "productId":5
     * }
     * @param cart
     * @return
     */
    @PostMapping("add_to_cart")
    @Transactional
    public JsonData addToCart(@RequestBody Cart cart) {

        int uid = LoginInterceptor.currentUserID;
        if (uid == -1) {
            return JsonData.buildError("Not looged in");
        }
        cart.setUserId(uid);
        int productId = cart.getProductId();

        // can't add product of current user
        List<Product> products = productService.getProductByUserId(cart.getUserId());
        for (Product product: products) {
            if (product.getId() == productId) {
                return JsonData.buildError("It's your item!");
            }
        }

        Cart cart1 = userService.getCartByUserIdAndProductId(cart.getUserId(), cart.getProductId());

        if (cart1 == null) {

            // when no such items in current user's cart
            cart.setCount(1);

            int num = productService.getProductById(cart.getProductId()).getStock();
            if (num < 1) {
                return JsonData.buildError("no stock left");
            }

            int row = userService.addToCart(cart);
            return JsonData.buildSuccess(row);
        } else {

            // when there is such item in current user's cart
            cart1.setCount(cart1.getCount() + 1);

            int num = productService.getProductById(cart1.getProductId()).getStock();
            if (num < cart1.getCount()) {
                return JsonData.buildError("no enough stock");
            }

            int row = userService.updateCartCount(cart1);
            return JsonData.buildSuccess(row);
        }
    }
}
