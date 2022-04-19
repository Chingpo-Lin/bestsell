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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private static final String resource = "config/mybatis-config.xml";
    private SqlSessionFactory sqlSessionFactory;
    public static Map<String, User> sessionMap = new HashMap<>();

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
            int row = userDao.signUpUser(user);
            return row;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }

    @Override
    public String login(String phone, String pwd) {

        try (SqlSession sqlSession = sqlSessionFactory.openSession()) {
            UserDao userDao = sqlSession.getMapper(UserDao.class);
            User user = userDao.login(phone, pwd);
            System.out.println(user == null);
            if (user != null) {
                String token = UUID.randomUUID().toString();
                System.out.println(token);
                sessionMap.put(token, user);
                return token;
            } else {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
