package com.webdesign.bestsell.controller;

import com.webdesign.bestsell.domain.Category;
import com.webdesign.bestsell.domain.Product;
import com.webdesign.bestsell.service.ProductService;
import com.webdesign.bestsell.utils.JsonData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/bestsell/pub/category")
public class CategoryController {

    @Autowired
    public ProductService productService;

    @GetMapping("get_all_category")
    public JsonData getAllCategory() {
        List<Category> categoryList = productService.getAllCategory();
        System.out.println(categoryList);
        return JsonData.buildSuccess(categoryList);
    }
}