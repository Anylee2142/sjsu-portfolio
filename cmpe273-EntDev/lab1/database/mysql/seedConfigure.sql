INSERT INTO users(name, email, password, 
phone_number, favorite, til, website, 
dob, city, state, country, nickname)
VALUES(
    "Alan Lee", "anylee2142@gmail.com", "1234",
    "408-512-0191", "Reading", "Thinking", "http://github.com/Anylee2142",
    "1992-02-03", "San Jose", "CA", "U.S.", "Amancio Ortega ;)"
);

INSERT INTO users(name, email, password, 
phone_number, favorite, til, website, 
dob, city, state, country, nickname)
VALUES(
    "Jaewoong Lee", "jaewoong.lee@sjsu.edu", "1234",
    "408-512-0191", "English Bulldog", "Getting rich", "http://github.com/Anylee2142",
    "1992-02-03", "San Jose", "CA", "U.S.", "THE GUY WHO NEVER SURRENDERS ;)"
);

INSERT INTO restaurants(name, type_of_food,
is_dine_in_possible, is_pickup_possible, is_delivery_possible,
location, avg_rating)
VALUES(
    "Rooster & Rice", "Asian",
    false, true, true,
    "TBD", "4.5"
);

INSERT INTO restaurants(name, type_of_food,
is_dine_in_possible, is_pickup_possible, is_delivery_possible,
location, avg_rating)
VALUES(
    "The Corner", "Breakfast & Burgers",
    false, true, true,
    "TBD", "4.1"
);

INSERT INTO restaurants(name, type_of_food,
is_dine_in_possible, is_pickup_possible, is_delivery_possible,
location, avg_rating)
VALUES(
    "Happi House", "Japanese",
    false, true, true,
    "TBD", "3.9"
);

INSERT INTO restaurants(name, type_of_food,
is_dine_in_possible, is_pickup_possible, is_delivery_possible,
location, avg_rating)
VALUES(
    "Wingstop", "Chicken",
    false, true, true,
    "TBD", "3.5"
);

INSERT INTO restaurants(name, type_of_food,
is_dine_in_possible, is_pickup_possible, is_delivery_possible,
location, avg_rating)
VALUES(
    "Omogari", "Korean",
    false, true, true,
    "TBD", "4.8"
);

INSERT INTO events(name, content,
start_time, end_time,
location, hashtags, res_name, res_pk)
VALUES(
    "Discounts 10% for Today's Lunch !", "Get your meal cheaper and more.",
    "2020-09-25 11:00", "2020-09-26 13:00",
    "TBD", "#FreeLunch? #Just_Take_it!", "Rooster & Rice", "1"
);


INSERT INTO events(name, content,
start_time, end_time,
location, hashtags, res_name, res_pk)
VALUES(
    "Free dumpings !", "Get your free dumpling !",
    "2020-09-22 10:00", "2020-09-23 13:00",
    "TBD", "#DumpyDumpy", "Omogari", "5"
);


INSERT INTO events(name, content,
start_time, end_time,
location, hashtags, res_name, res_pk)
VALUES(
    "Free dumpings 1!", "Get your free dumpling !",
    "2020-09-22 10:00", "2020-09-23 13:00",
    "TBD", "#DumpyDumpy 1", "Omogari", "5"
);

INSERT INTO events(name, content,
start_time, end_time,
location, hashtags, res_name, res_pk)
VALUES(
    "Free dumpings 21!", "Get your free dumpling !",
    "2020-09-22 10:00:00", "2020-09-23 13:00:00",
    "TBD", "#DumpyDumpy2", "Omogari", "5"
);

INSERT INTO orders(user_pk, res_pk,
order_date, food_provide_code, order_status,
total_price)
VALUES(
    "1", "5",
    "2020-09-25 12:00:00", "2", "Preparing",
    "25"
);

INSERT INTO orders(user_pk, res_pk,
order_date, food_provide_code, order_status,
total_price)
VALUES(
    "1", "1",
    "2020-09-24 12:00:00", "2", "Delivered",
    "21"
);

INSERT INTO orders(user_pk, res_pk,
order_date, food_provide_code, order_status,
total_price)
VALUES(
    "1", "2",
    "2020-09-23 14:00:00", "2", "Delivered",
    "32"
);

