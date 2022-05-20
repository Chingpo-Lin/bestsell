package com.webdesign.bestsell.controller;
import com.webdesign.bestsell.domain.Product;
import com.webdesign.bestsell.domain.User;
import com.webdesign.bestsell.interceptor.LoginInterceptor;
import com.webdesign.bestsell.service.FirebaseStorageService;
import com.webdesign.bestsell.service.PictureService;
import com.webdesign.bestsell.service.ProductService;
import com.webdesign.bestsell.service.UserService;
import com.webdesign.bestsell.utils.JsonData;
import com.webdesign.bestsell.utils.MD5Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/pri/user")
public class UserController {

    static final int FIVE_DAYS = 43200;

    @Autowired
    public UserService userService;
    @Autowired
    public ProductService productService;
    @Autowired
    public FirebaseStorageService FirebaseService;
    @Autowired
    public PictureService pictureService;

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
     * login user
     * localhost:8080/pri/user/login
     * @param user
     * @return
     */
    @PostMapping("login")
    public JsonData login(@RequestBody User user, HttpServletRequest request, HttpServletResponse response) {
        String crypPassword = MD5Utils.MD5(user.getPwd());
        User loggedinUser = userService.login(user.getPhone(),  crypPassword);
        if (loggedinUser != null) {
            String sessionID = UUID.randomUUID().toString();
            request.getSession().setAttribute(sessionID, loggedinUser);
            Cookie cookie = new Cookie("sessionId", sessionID);
            cookie.setPath("/");
            cookie.setMaxAge(FIVE_DAYS);
            response.addCookie(cookie);
            return JsonData.buildSuccess(loggedinUser);
        }
        return JsonData.buildError("Password or username invalid");
    }

    @GetMapping("logout")
    public JsonData logout(HttpServletRequest request) {
        String sessionId = "Default";
        Cookie [] cookies = request.getCookies();
        if (cookies == null) {
            System.out.println("No Cookies");
            return JsonData.buildSuccess("Logged out: No cookies");
        }

        for (Cookie cookie: cookies) {
            if (cookie.getName().equals("sessionId")) {
                System.out.println("log out: found session id in cookie:" +  cookie.getValue());
                sessionId = cookie.getValue();
                break;
            }
        }

        if (sessionId.equals("Default")) {
            return JsonData.buildSuccess("cannot find sessionId in cookies");
        }

        User user = (User)request.getSession().getAttribute(sessionId);
        if (user != null) {
            String userName = user.getName();
            request.getSession().removeAttribute(sessionId);
            return JsonData.buildSuccess(userName + ", you are Logged out, seesion id removed");
        }
        else {
            return JsonData.buildSuccess("seesion id not found");
        }
    }

    /**
     * sell product
     * localhost:8080/pri/user/sell_product
     * post format:
     * product:  {
     *     "userId":1,
     *     "price":39.5,
     *     "img":"assssdadss",
     *     "description":"efe,lasdlxxf",
     *     "stock":0,
     *     "name":"cccsss",
     *     "categoryId":1
     * }
     *  file: list of files selected
     * @return
     */
    @PostMapping("sell_product")
    public JsonData sellProduct(@RequestPart("product") Product product, @RequestParam("file") MultipartFile [] files) {

        //add product to database
        int uid = LoginInterceptor.currentUserID;
        if (uid == -1) {
            return JsonData.buildError("Not looged in");
        }

        product.setUserId(uid);
        product.setCreateDate(new Date());

        //save product image to firebase;
        String downloadURL = null;
        for (MultipartFile file : files) {
            try {
                downloadURL = FirebaseService.upload(file);
                pictureService.addPicture(product.getId(), downloadURL);
            } catch (Exception e) {
                return JsonData.buildError("Error occur when uploading file");
            }
        }

        product.setImg(downloadURL);
        int row = productService.sell(product);
        return JsonData.buildSuccess("success uploaded, URL:  " + downloadURL);
    }

    /**
     * get all products sold by given user
     * localhost:8080/pri/user/list_product_by_user_id
     * @return
     */
    @GetMapping("list_product_by_user_id")
    public JsonData listProductByUserId() {

        int uid = LoginInterceptor.currentUserID;
        if (uid == -1) {
            return JsonData.buildError("Not looged in");
        }
        List<Product> productList = productService.getProductByUserId(uid);
//        System.out.println(productList);
        return JsonData.buildSuccess(productList);
    }

    /**
     * list user
     * localhost:8080/pri/user/list_user
     * @return
     */
    @GetMapping("list_user")
    public JsonData listUser() {

        List<User> userList = userService.listUser();
//        System.out.println(userList);
        return JsonData.buildSuccess(userList);
    }
}
