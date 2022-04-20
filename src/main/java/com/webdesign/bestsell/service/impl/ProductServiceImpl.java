package com.webdesign.bestsell.service.impl;

import com.webdesign.bestsell.dao.CategoryDao;
import com.webdesign.bestsell.dao.ProductDao;
import com.webdesign.bestsell.dao.UserDao;
import com.webdesign.bestsell.domain.Category;
import com.webdesign.bestsell.domain.Product;
import com.webdesign.bestsell.domain.User;
import com.webdesign.bestsell.service.ProductService;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductServiceImpl implements ProductService {

    private static final String resource = "config/mybatis-config.xml";
    private SqlSessionFactory sqlSessionFactory;

    public ProductServiceImpl() throws IOException {
        InputStream inputStream = Resources.getResourceAsStream(resource);
        sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

    }
    /**
     * list product by given if on stock
     * @param stock
     * @return
     */
    @Override
    public List<Product> listProduct(boolean stock) {
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            ProductDao productDao = sqlSession.getMapper(ProductDao.class);
            if (stock) {
                return productDao.getProductOnSell();
            }
            return productDao.getAllProduct();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Product> getProductByUserId(int userId) {

        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            ProductDao productDao = sqlSession.getMapper(ProductDao.class);
            return productDao.getProductByUserId(userId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Product> getProductByCategoryId(int categoryId) {
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            ProductDao productDao = sqlSession.getMapper(ProductDao.class);
            return productDao.getProductByCategoryId(categoryId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public int sell(Product product) {
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            ProductDao productDao = sqlSession.getMapper(ProductDao.class);
            return productDao.sell(product);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public List<Category> getAllCategory() {
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            CategoryDao categoryDao = sqlSession.getMapper(CategoryDao.class);
            return categoryDao.getAllCategory();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Product getProductById(int id) {
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            ProductDao productDao = sqlSession.getMapper(ProductDao.class);
            return productDao.getProductById(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public int updateStock(Product product) {
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            ProductDao productDao = sqlSession.getMapper(ProductDao.class);
            return productDao.updateProduct(product);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }


}
