package com.webdesign.bestsell;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@MapperScan("com.webdesign.bestsell.dao")
@EnableTransactionManagement
public class BestsellApplication {

	public static void main(String[] args) {
		SpringApplication.run(BestsellApplication.class, args);
	}

}
