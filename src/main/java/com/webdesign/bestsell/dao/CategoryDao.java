package com.webdesign.bestsell.dao;

import com.webdesign.bestsell.domain.Cart;
import com.webdesign.bestsell.domain.Category;

import java.util.List;

public interface CategoryDao {

    /**
     * get all category
     * @return
     */
    List<Category> getAllCategory();
}
