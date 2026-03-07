package org.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Dispatcher {

    public static void main(String[] args) {

        SpringApplication.run(Dispatcher.class, args);
        System.out.println("Spring was launched and working now!");
    }
}