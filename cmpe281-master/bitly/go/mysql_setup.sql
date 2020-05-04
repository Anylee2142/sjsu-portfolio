# mysql --user=root --password=YOUR_PASSWORD

create database cmpe281 ;

use cmpe281 ;

CREATE TABLE User (
    `user_pk` bigint(20) NOT NULL AUTO_INCREMENT,
    `user_uuid` varchar(255) NOT NULL,
    `id` varchar(255) NOT NULL,
    `pw` varchar(255) NOT NULL,
    PRIMARY KEY (`user_pk`),
    UNIQUE KEY unique_user_uuid (`user_uuid`),
    UNIQUE KEY unique_id (`id`)
) ;

CREATE TABLE Link (
    `link_pk` bigint(20) NOT NULL AUTO_INCREMENT,
    `link_uuid` varchar(255) NOT NULL,
    `original_link` varchar(255) NOT NULL,
    `shortened_link` varchar(255) NOT NULL,
    `create_time` varchar(255) NOT NULL,
    `user_pk` bigint(20) NULL,
    PRIMARY KEY (`link_pk`),
    UNIQUE KEY unique_link_uuid (`link_uuid`),
    FOREIGN KEY (`user_pk`) REFERENCES User(`user_pk`)
) ;

insert into User (`user_uuid`, `id`, `pw`)
values ("i3c9ei2j21", "sjsu", "cmpe281") ;
insert into User (`user_uuid`, `id`, `pw`)
values ("9djqnx8231", "jaewoong", "cmpe281") ;

insert into Link (`link_uuid`, `original_link`, `shortened_link`, `create_time`)
values ("qkci3jej1b", "www.google.com", "qwerqwer", "1111") ;
insert into Link (`link_uuid`, `original_link`, `shortened_link`, `create_time`, `user_pk`)
values ("q23rasdvzc", "cnn.com", "asdfasdf", "1111", 2) ;
insert into Link (`link_uuid`, `original_link`, `shortened_link`, `create_time`, `user_pk`)
values ("hqw1234erz", "https://www.sjsu.edu/", "zxcvzxcv", "1111", 1) ;

