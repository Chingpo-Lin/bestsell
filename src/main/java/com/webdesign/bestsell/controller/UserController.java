package com.webdesign.bestsell.controller;

import com.webdesign.bestsell.domain.Cart;
import com.webdesign.bestsell.domain.Product;
import com.webdesign.bestsell.domain.User;
import com.webdesign.bestsell.service.ProductService;
import com.webdesign.bestsell.service.UserService;
import com.webdesign.bestsell.utils.JsonData;
import com.webdesign.bestsell.utils.MD5Utils;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/pri/user")
public class UserController {

    @Autowired
    public UserService userService;

    @Autowired
    public ProductService productService;

    /**
     * sign up user
     * localhost:8080/pri/user/signup
     * @param user
     * @return
     */
    @PostMapping("signup")
    public JsonData signup(@RequestBody User user) {

        // adapt MD5 algorithm to user password

        if (userService.findUserByPhone(user.getPhone()) != null) {
            return JsonData.buildError("user exists");
        }
        user.setPwd(MD5Utils.MD5(user.getPwd()));
        int row = userService.signup(user);

        return row > 0 ? JsonData.buildSuccess(user.getName()): JsonData.buildError("cannot signup");
    }

    /**
     * list user
     * localhost:8080/pri/user/list_user
     * @return
     */
    @GetMapping("list_user")
    public JsonData listUser() {

        List<User> userList = userService.listUser();
        System.out.println(userList);
        return JsonData.buildSuccess(userList);
    }

    /**
     * login user
     * localhost:8080/pri/user/login
     * @param user
     * @return
     */
    @PostMapping("login")
    public JsonData login(@RequestBody User user) {
        String token = userService.login(user.getPhone(), MD5Utils.MD5(user.getPwd()));
        return token != null ? JsonData.buildSuccess(token): JsonData.buildError("error of phone or pwd");
    }

    /**
     * sell product
     * localhost:8080/pri/user/sell_product
     * post format:
     * {
     *     "userId":1,
     *     "price":39.5,
     *     "img":"assssdadss",
     *     "description":"efe,lasdlxxf",
     *     "stock":0,
     *     "name":"cccsss",
     *     "categoryId":1
     * }
     * @param product
     * @return
     */
    @PostMapping("sell_product")
    public JsonData sellProduct(@RequestBody Product product) {
//        Product product = new Product(777, 7.7, "image", "This is a test", 7, "Test", 7);
        product.setCreateDate(new Date());
        int row = productService.sell(product);

        return row > 0 ? JsonData.buildSuccess(product.getName()): JsonData.buildError("cannot sell");
    }

    /**
     * get all products sold by given user
     * localhost:8080/pri/user/list_product_by_user_id
     * @return
     */
    @GetMapping("list_product_by_user_id")
    public JsonData listProductByUserId() {

        // get uid from session later
        int uid = 1;

        List<Product> productList = productService.getProductByUserId(uid);
        System.out.println(productList);
        return JsonData.buildSuccess(productList);
    }
}
