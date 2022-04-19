package com.webdesign.bestsell.dao;

import com.webdesign.bestsell.domain.Product;

import java.util.List;

public interface ProductDao {

    /**
     * get all product list
     * @return
     */
    List<Product> getAllProduct();

    /**
     * get all products with stock > 0
     * @return
     */
    List<Product> getProductOnSell();

    /**
     * get product by given user id
     * @param userId
     * @return
     */
    List<Product> getProductByUserId(int userId);

    /**
     * get product by given category id
     * @param categoryId
     * @return
     */
    List<Product> getProductByCategoryId(int categoryId);

    /**
     * sell product
     * @param product
     * @return
     */
    int sell(Product product);
}
