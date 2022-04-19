package com.webdesign.bestsell.service.impl;

import com.webdesign.bestsell.dao.UserDao;
import com.webdesign.bestsell.domain.User;
import com.webdesign.bestsell.service.UserService;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private static final String resource = "config/mybatis-config.xml";
    private SqlSessionFactory sqlSessionFactory;

    public UserServiceImpl() throws IOException {

        InputStream inputStream = Resources.getResourceAsStream(resource);
        sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

    }

    @Override
    public List<User> listUser() {
        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            UserDao userDao = sqlSession.getMapper(UserDao.class);
            List<User> list = userDao.listUser();
            return list;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public int signup(User user) {

        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            UserDao userDao = sqlSession.getMapper(UserDao.class);
            User newUser = new User(user.getPhone(), user.getPwd(), user.getName(), user.getAddress());
            int row = userDao.signUpUser(newUser);
            System.out.println("row:" + row);
            System.out.println("userid:" + newUser.getId());
            System.out.println("username:" + user.getName());
            return row;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }
}
