CREATE TABLE IF NOT EXISTS users (
    user_pk MEDIUMINT NOT NULL AUTO_INCREMENT,
    name char(30) NOT NULL UNIQUE,
    email char(50) NOT NULL,
    password char(50) NOT NULL,
    phone_number char(20) NULL,
    favorite char(30) NULL,
    til char(30) NULL, -- Things I Love
    website varchar(50) NULL,
    dob date NULL,
    city char(10) NULL,
    state char(20) NULL,
    country char(20) NULL,
    nickname char(30) NULL,
    PRIMARY KEY(user_pk)
);

CREATE TABLE IF NOT EXISTS restaurants (
    res_pk MEDIUMINT NOT NULL AUTO_INCREMENT,
    name char(30) NOT NULL UNIQUE,
    type_of_food char(30) NOT NULL, -- Mexican, American, Asian etc
    is_dine_in_possible boolean NOT NULL,
    is_pickup_possible boolean NOT NULL,
    is_delivery_possible boolean NOT NULL,
    location char(80) NOT NULL,
    avg_rating TINYINT NULL,
    PRIMARY KEY(res_pk)
);

CREATE TABLE IF NOT EXISTS menus (
    menu_pk MEDIUMINT NOT NULL AUTO_INCREMENT,
    res_pk MEDIUMINT NOT NULL,
    name char(50) NOT NULL,
    price int NOT NULL,
    PRIMARY KEY(menu_pk),
    FOREIGN KEY (res_pk) REFERENCES restaurants(res_pk)
);

CREATE TABLE IF NOT EXISTS reviews (
    review_pk MEDIUMINT NOT NULL AUTO_INCREMENT,
    user_pk MEDIUMINT NOT NULL,
    res_pk MEDIUMINT NOT NULL,
    content VARCHAR(300) NOT NULL,
    rating TINYINT NOT NULL,
    post_date DATE NOT NULL,
    PRIMARY KEY(review_pk),
    FOREIGN KEY (user_pk) REFERENCES users(user_pk),
    FOREIGN KEY (res_pk) REFERENCES restaurants(res_pk)
);

CREATE TABLE IF NOT EXISTS orders (
    order_pk MEDIUMINT NOT NULL AUTO_INCREMENT,
    user_pk MEDIUMINT NOT NULL,
    res_pk MEDIUMINT NOT NULL,
    order_date DATE NOT NULL,
    food_provide_code CHAR(10) NOT NULL, -- 0 = dine-in, 1 = pickup, 2 = delivery
    PRIMARY KEY(order_pk),
    FOREIGN KEY (user_pk) REFERENCES users(user_pk),
    FOREIGN KEY (res_pk) REFERENCES restaurants(res_pk)
);

CREATE TABLE IF NOT EXISTS events (
    event_pk MEDIUMINT NOT NULL AUTO_INCREMENT,
    name char(30) NOT NULL UNIQUE,
    content VARCHAR(500) NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    location char(80) NOT NULL,
    user_pk MEDIUMINT NOT NULL,
    PRIMARY KEY(event_pk),
    FOREIGN KEY (user_pk) REFERENCES users(user_pk)
);

