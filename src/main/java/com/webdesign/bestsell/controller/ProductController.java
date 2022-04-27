package com.webdesign.bestsell.controller;


import com.webdesign.bestsell.domain.Category;
import com.webdesign.bestsell.domain.Product;
import com.webdesign.bestsell.domain.User;
import com.webdesign.bestsell.service.ProductService;
import com.webdesign.bestsell.service.UserService;
import com.webdesign.bestsell.utils.JsonData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/pub/product")
public class ProductController {

    @Autowired
    public ProductService productService;

    /**
     * list product
     * localhost:8080/pub/product/list_all_product
     * @return
     */
    @GetMapping("list_all_product")
    public JsonData listAllProduct() {
        List<Product> productList = productService.listProduct(false);
        System.out.println(productList);
        return JsonData.buildSuccess(productList);
    }

    /**
     * list on sell product
     * localhost:8080/pub/product/list_product_on_sell
     * @return
     */
    @GetMapping("list_product_on_sell")
    public JsonData listProductOnSell() {
        List<Product> productList = productService.listProduct(true);
        System.out.println(productList);
        return JsonData.buildSuccess(productList);
    }

    /**
     * list product by category
     * localhost:8080/pub/product/list_product_by_category_id?categoryId=1
     * @param categoryId
     * @return
     */
    @GetMapping("list_product_by_category_id")
    public JsonData listProductByCategoryId(int categoryId) {
        System.out.println(categoryId);
        List<Product> productList = productService.getProductByCategoryId(categoryId);
        System.out.println(productList);
        return JsonData.buildSuccess(productList);

    }
}
