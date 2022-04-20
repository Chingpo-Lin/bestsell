package com.webdesign.bestsell.controller;

import com.webdesign.bestsell.domain.Cart;
import com.webdesign.bestsell.domain.Product;
import com.webdesign.bestsell.service.ProductService;
import com.webdesign.bestsell.service.UserService;
import com.webdesign.bestsell.utils.JsonData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bestsell/pri/cart")
public class CartController {

    @Autowired
    public UserService userService;

    @Autowired
    public ProductService productService;

    @GetMapping("get_user_cart")
    public JsonData getCartByUserId() {
        int id = 1;
        List<Cart> cartList = userService.getCartByUserId(id);
        System.out.println(cartList);
        return JsonData.buildSuccess(cartList);
    }

    @GetMapping("delete_cart")
    public JsonData deleteCartByCartId() {
        int id = 1;
        int row = userService.deleteItemFromCart(id);
        System.out.println(row);
        return JsonData.buildSuccess(row);
    }

    @PostMapping("add_to_cart")
    public JsonData addToCart(@RequestBody Cart cart) {

        int productId = cart.getProductId();

        // can't add product of current user
        List<Product> products = productService.getProductByUserId(cart.getUserId());
        for (Product product: products) {
            if (product.getId() == productId) {
                return JsonData.buildError("It's your item!");
            }
        }

        int row = userService.addToCart(cart);
        System.out.println(row);
        return JsonData.buildSuccess(row);
    }
}
