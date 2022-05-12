package com.webdesign.bestsell.service.impl;

import com.webdesign.bestsell.dao.CategoryDao;
import com.webdesign.bestsell.dao.PicturesDao;
import com.webdesign.bestsell.dao.ProductDao;
import com.webdesign.bestsell.dao.UserDao;
import com.webdesign.bestsell.domain.Category;
import com.webdesign.bestsell.domain.Picture;
import com.webdesign.bestsell.domain.Product;
import com.webdesign.bestsell.domain.User;
import com.webdesign.bestsell.service.ProductService;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductDao productDao;
    @Autowired
    private CategoryDao categoryDao;

    /**
     * list product by given if on stock
     * @param stock
     * @return
     */
    @Override
    public List<Product> listProduct(boolean stock) {
        if (stock) {
            return productDao.getProductOnSell();
        }
        return productDao.getAllProduct();
    }

    @Override
    public List<Product> getProductByUserId(int userId) {
        return productDao.getProductByUserId(userId);
    }

    @Override
    public List<Product> getProductByCategoryId(int categoryId) {
        return productDao.getProductByCategoryId(categoryId);
    }

    @Override
    public int sell(Product product) {
        return productDao.sell(product);
    }

    @Override
    public List<Category> getAllCategory() {
        return categoryDao.getAllCategory();
    }

    @Override
    public Product getProductById(int id) {
        return productDao.getProductById(id);
    }

    @Override
    public int updateStock(Product product) {
        return productDao.updateProduct(product);
    }

    @Override
    public List<Product> searchProductByName(String name) { return productDao.searchProductByName(name);
    }


}
