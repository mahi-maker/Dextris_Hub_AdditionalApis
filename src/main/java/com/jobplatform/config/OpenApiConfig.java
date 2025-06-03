package com.jobplatform.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI jobPlatformOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Job Platform API")
                        .description("API documentation for the job platform application")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Job Platform Team")
                                .email("support@jobplatform.com")));
    }
}