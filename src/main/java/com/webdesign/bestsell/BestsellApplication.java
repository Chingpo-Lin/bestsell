package com.webdesign.bestsell;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.mybatis.spring.annotation.MapperScan;

@SpringBootApplication
@MapperScan("com.webdesign.bestsell.dao")
public class BestsellApplication {

	public static void main(String[] args) {
		SpringApplication.run(BestsellApplication.class, args);
	}

}
