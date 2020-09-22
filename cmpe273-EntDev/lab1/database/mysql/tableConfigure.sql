CREATE TABLE IF NOT EXISTS user (
    user_pk MEDIUMINT NOT NULL AUTO_INCREMENT,
    name char(30) NOT NULL,
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

CREATE TABLE IF NOT EXISTS restaurant (
    res_pk MEDIUMINT NOT NULL AUTO_INCREMENT,
    name char(30) NOT NULL,
    type_of_food char(30) NOT NULL, -- Mexican, American, Asian etc
    is_dine_in_possible boolean NOT NULL,
    is_pickup_possible boolean NOT NULL,
    is_delivery_possible boolean NOT NULL,
    location char(80) NOT NULL,
    avg_rating TINYINT NULL,
    PRIMARY KEY(res_pk)
);

CREATE TABLE IF NOT EXISTS review (
    review_pk MEDIUMINT NOT NULL AUTO_INCREMENT,
    user_pk MEDIUMINT NOT NULL,
    res_pk MEDIUMINT NOT NULL,
    content VARCHAR(300) NOT NULL,
    rating TINYINT NOT NULL,
    post_date DATE NOT NULL,
    PRIMARY KEY(review_pk),
    FOREIGN KEY (user_pk) REFERENCES user(user_pk),
    FOREIGN KEY (res_pk) REFERENCES restaurant(res_pk)
);

CREATE TABLE IF NOT EXISTS event (
    event_pk MEDIUMINT NOT NULL AUTO_INCREMENT,
    name char(30) NOT NULL,
    content VARCHAR(500) NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    location char(80) NOT NULL,
    user_pk MEDIUMINT NOT NULL,
    PRIMARY KEY(event_pk),
    FOREIGN KEY (user_pk) REFERENCES user(user_pk)
);

