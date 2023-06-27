package com.seb_pre_007.Server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import javax.annotation.PostConstruct;
import java.sql.Time;
import java.util.TimeZone;

@EnableJpaAuditing
@SpringBootApplication
public class ServerApplication {

	//로컬시간 설정
	@PostConstruct
	public void started(){
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
	}
	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}


}
