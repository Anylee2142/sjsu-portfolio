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

INSERT INTO restaurants(name, email, password, city, state,
phone_number, res_desc, type_of_food,
is_dine_in_possible, is_pickup_possible, is_delivery_possible,
avg_rating, res_long, res_lat)
VALUES(
    "Rooster & Rice", "rooster@rice.com", "1234", "San Jose", "California",
    "408-111-2222", "The best rice and chicken bowl restaurant ever, Come by!", "Asian",
    true, false, true,
    4.5, -121.896508, 37.382539
);

INSERT INTO restaurants(name, email, password, city, state,
phone_number, res_desc, type_of_food,
is_dine_in_possible, is_pickup_possible, is_delivery_possible,
avg_rating, res_long, res_lat)
VALUES(
    "The Corner", "corner@corner.com", "1234", "San Jose", "California",
    "408-222-3333", "Western restaurant ran by Vietnamese", "Breakfast and Burgers",
    false, true, true,
    4.1, -121.875639, 37.332908
);

INSERT INTO restaurants(name, email, password, city, state,
phone_number, res_desc, type_of_food,
is_dine_in_possible, is_pickup_possible, is_delivery_possible,
avg_rating, res_long, res_lat)
VALUES(
    "Happi House", "happi@house.com", "1234", "Santa Clara", "California",
    "408-333-4444", "Japanese Restaurant with lots of fried foods", "Japanese",
    false, true, true,
    3.9, -121.896037, 37.350799
);

INSERT INTO restaurants(name, email, password, city, state,
phone_number, res_desc, type_of_food,
is_dine_in_possible, is_pickup_possible, is_delivery_possible,
avg_rating, res_long, res_lat)
VALUES(
    "Wingstop", "wing@stop.com", "1234", "San Mateo", "California",
    "408-444-5555", "Chicken Yammy", "Chicken",
    false, true, true,
    3.5, -121.903779, 37.340214
);

INSERT INTO restaurants(name, email, password, city, state,
phone_number, res_desc, type_of_food,
is_dine_in_possible, is_pickup_possible, is_delivery_possible,
avg_rating, res_long, res_lat)
VALUES(
    "Omogari", "omo@gari.com", "1234", "San Jose", "California",
    "408-555-6666", "Korean Restaurant ever", "Korean",
    false, true, true,
    4.8, -121.895113, 37.348456
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

INSERT INTO menus(name, price, res_pk)
VALUES(
    "Chicken Breast, Thigh and Rice", "15", "1"
);

INSERT INTO menus(name, price, res_pk)
VALUES(
    "Only Chicken Brest, Brown Rice", "16", "1"
);

INSERT INTO menus(name, price, res_pk)
VALUES(
    "Vegatbles Broth", "3", "1"
);

INSERT INTO menus(name, price, res_pk)
VALUES(
    "French Toast and Sausage", "17", "2"
);

INSERT INTO menus(name, price, res_pk)
VALUES(
    "Salmon Salad", "21", "2"
);

INSERT INTO menus(name, price, res_pk)
VALUES(
    "Ice Tea", "6", "2"
);

INSERT INTO menus(name, price, res_pk)
VALUES(
    "Tempura Bundles", "25", "3"
);


INSERT INTO menus(name, price, res_pk)
VALUES(
    "Udon with beef", "15", "3"
);


INSERT INTO menus(name, price, res_pk)
VALUES(
    "Happy Face Potatoes", "6", "3"
);


INSERT INTO menus(name, price, res_pk)
VALUES(
    "Buffalo Wings", "12", "4"
);


INSERT INTO menus(name, price, res_pk)
VALUES(
    "French Fries with Cheese", "13", "4"
);


INSERT INTO menus(name, price, res_pk)
VALUES(
    "Coke", "5", "4"
);


INSERT INTO menus(name, price, res_pk)
VALUES(
    "Marinated, Grilled Beef", "27", "5"
);


INSERT INTO menus(name, price, res_pk)
VALUES(
    "Kimchi jji-gae", "16", "5"
);


INSERT INTO menus(name, price, res_pk)
VALUES(
    "Bi-bim-Bop", "15", "5"
);

INSERT INTO reviews(user_pk, res_pk,
content, 
rating, post_date)
VALUES(
    "1", "1",
    "Food is really clean and healthy",
    4.8, "2020-09-29 14:56:00"
);

INSERT INTO reviews(user_pk, res_pk,
content, 
rating, post_date)
VALUES(
    "2", "1",
    "Sometimes they miss some side stuffs though",
    4.5, "2020-09-29 11:00:00"
);

INSERT INTO reviews(user_pk, res_pk,
content, 
rating, post_date)
VALUES(
    "1", "2",
    "French Toast is really awesome !",
    4.3, "2020-09-28 14:56:00"
);

INSERT INTO reviews(user_pk, res_pk,
content, 
rating, post_date)
VALUES(
    "1", "2",
    "With Salmon Salad, what a full day",
    4.4, "2020-09-27 14:56:00"
);

INSERT INTO reviews(user_pk, res_pk,
content, 
rating, post_date)
VALUES(
    "2", "3",
    "Too many fried foods",
    3.8, "2020-09-29 14:10:00"
);

INSERT INTO reviews(user_pk, res_pk,
content, 
rating, post_date)
VALUES(
    "2", "3",
    "Udon tastes a bit bitter",
    3.2, "2020-09-28 10:56:00"
);

INSERT INTO reviews(user_pk, res_pk,
content, 
rating, post_date)
VALUES(
    "1", "4",
    "Chicken itself is good, but marination",
    2.5, "2020-09-21 09:56:00"
);

INSERT INTO reviews(user_pk, res_pk,
content, 
rating, post_date)
VALUES(
    "2", "4",
    "Fried food was fine though",
    4.5, "2020-09-29 15:56:00"
);

INSERT INTO reviews(user_pk, res_pk,
content, 
rating, post_date)
VALUES(
    "2", "5",
    "Grilled Beef and Kim-chi ggi-gae are awesome !",
    4.8, "2020-09-29 14:56:00"
);

INSERT INTO reviews(user_pk, res_pk,
content, 
rating, post_date)
VALUES(
    "1", "5",
    "Try ho-ddeouk next time !",
    4.8, "2020-09-29 11:56:00"
);

