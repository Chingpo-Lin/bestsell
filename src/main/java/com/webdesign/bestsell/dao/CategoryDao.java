package com.webdesign.bestsell.dao;

import com.webdesign.bestsell.domain.Cart;

import java.util.List;

public interface CategoryDao {

    /**
     * get all category
     * @return
     */
    List<Cart> getAllCategory();

    /**
     * get cart by given user id
     * @param categoryId
     * @return
     */
    String getCategoryNameById(int categoryId);



}
