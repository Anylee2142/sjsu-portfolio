CREATE TABLE IF NOT EXISTS users (
    user_pk MEDIUMINT NOT NULL AUTO_INCREMENT,
    name char(30) NOT NULL,
    email char(50) NOT NULL UNIQUE,
    password char(50) NOT NULL,
    phone_number char(20) NULL,
    favorite char(30) NULL,
    til char(30) NULL, -- Things I Love
    website varchar(50) NULL,
    dob date NULL,
    city char(20) NULL,
    state char(20) NULL,
    country char(20) NULL,
    nickname char(30) NULL,
    headline char(100) NULL,
    PRIMARY KEY(user_pk)
);

CREATE TABLE IF NOT EXISTS restaurants (
    res_pk MEDIUMINT NOT NULL AUTO_INCREMENT,
    name char(30) NOT NULL UNIQUE,
    email char(50) NOT NULL UNIQUE,
    password CHAR(50) NOT NULL,
    city char(20) NOT NULL,
    state char(20) NOT NULL,
    phone_number char(20) NULL,
    res_long FLOAT(9, 6) NULL,
    res_lat FLOAT(9, 6) NULL,
    res_desc char(100) NULL,
    type_of_food char(30) NULL, -- Mexican, American, Asian etc
    is_dine_in_possible boolean NULL,
    is_pickup_possible boolean NULL,
    is_delivery_possible boolean NULL,
    avg_rating FLOAT(3, 2) NULL,
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
    rating FLOAT(3, 2) NOT NULL,
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
    order_status char(20) NOT NULL, -- Order Received, Preparing, (On the Way, Delivered), (Pick up Ready, Picked up)
    total_price MEDIUMINT NOT NULL,
    PRIMARY KEY(order_pk),
    FOREIGN KEY (user_pk) REFERENCES users(user_pk),
    FOREIGN KEY (res_pk) REFERENCES restaurants(res_pk)
);

CREATE TABLE IF NOT EXISTS events (
    event_pk MEDIUMINT NOT NULL AUTO_INCREMENT,
    name char(50) NOT NULL UNIQUE,
    content VARCHAR(500) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    location char(80) NOT NULL,
    hashtags VARCHAR(100) NULL,
    res_pk MEDIUMINT NOT NULL,
    res_name char(30) NOT NULL, -- If join at `/eventRegisters/:user_pk` take too much time, then use this -- Denormalization
    PRIMARY KEY(event_pk),
    FOREIGN KEY (res_pk) REFERENCES restaurants(res_pk)
);

CREATE TABLE IF NOT EXISTS eventRegister (
    er_pk MEDIUMINT NOT NULL AUTO_INCREMENT,
    user_pk MEDIUMINT NOT NULL,
    event_pk MEDIUMINT NOT NULL,
    res_pk MEDIUMINT NOT NULL,
    PRIMARY KEY(er_pk),
    UNIQUE KEY(user_pk, event_pk),
    FOREIGN KEY (user_pk) REFERENCES users(user_pk),
    FOREIGN KEY (event_pk) REFERENCES events(event_pk),
    FOREIGN KEY (res_pk) REFERENCES restaurants(res_pk) -- Denormalization
);

CREATE TABLE IF NOT EXISTS orderMenu (
    om_pk MEDIUMINT NOT NULL AUTO_INCREMENT,
    order_pk MEDIUMINT NOT NULL,
    menu_pk MEDIUMINT NOT NULL,
    qtn MEDIUMINT NOT NULL, -- at least 1
    price MEDIUMINT NOT NULL,   -- Denormalization
    PRIMARY KEY(om_pk),
    FOREIGN KEY (order_pk) REFERENCES orders(order_pk),
    FOREIGN KEY (menu_pk) REFERENCES menus(menu_pk)
);


