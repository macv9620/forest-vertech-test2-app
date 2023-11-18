package com.vertech.forest;

import com.vertech.forest.bigqueryConfig.BigQueryConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("classpath:bigquery.properties")
public class ForestApplication {

	public static void main(String[] args) {
		SpringApplication.run(ForestApplication.class, args);
	}

}
