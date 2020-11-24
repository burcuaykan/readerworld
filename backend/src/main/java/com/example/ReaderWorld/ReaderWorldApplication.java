package com.example.ReaderWorld;

import com.example.ReaderWorld.config.WebSecurityConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication()
public class ReaderWorldApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReaderWorldApplication.class, args);
	}

}
