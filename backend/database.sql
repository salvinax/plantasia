drop database if exists plantasia;
create database plantasia;
use plantasia;


create table products (
    productID int not null PRIMARY KEY,
    productName varchar(255), 
    productDescription TEXT, 
    imgLink varchar(255),
    variantType varchar(20)
);

create table variants (
    productID int not null, 
    variantName varchar(255) not null, 
    rank int, 
    variantPrice decimal(5,2),
    quantity int not null, 
    primary key(productID, variantName),
    foreign key (productID) references products(productID) on delete cascade
);

create table filters (
    productID int not null, 
    filterName varchar(50) not null, 
    primary key(productID, filterName),
    foreign key (productID) references products(productID) on delete cascade
);

create table users (
    username VARCHAR(255) PRIMARY KEY,
    firstName VARCHAR(255) not null, 
    lastName VARCHAR(255) not null, 
    userPassword VARCHAR(255)
);

create table orders (
    orderID int PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) not null,
    orderPrice decimal(5, 2) not null, 
    subtotal decimal(5,2) not null,
    shipping decimal(5,2),
    taxes decimal(5,2),
    numItems int not null, 
    orderDate Date,
    orderTime Time, 
    street varchar(100) not null,
    city varchar(100) not null,
    province varchar(100) not null,
    pc varchar(100) not null,
    foreign key (username) references users(username) on delete cascade
);

create table orderContains(
    orderID int not null, 
    productID int not null, 
    variantName varchar(255),
    productPrice decimal(5, 2) not null,
    quantity int not null, 
    primary key(orderID, productID, variantName),
    foreign key (orderID) references orders(orderID) on delete cascade,
    foreign key (productID, variantName) references variants(productID, variantName) on delete cascade
);



insert into products values
('1', 'ZZ Plant', "The ZZ Plant (Zamioculcas Zamiifolia) is a beginner-friendly and low-maintenance houseplant that can really create a statement in a room. It thrives in darker places in your house and can live in places most other plants won't be able to grow.", 'zz-plant.jpg','Size'),
('2', 'Terracotta Planter', "Premium terrocatta planter with a drainage hole. Ideal for outdoor and indoor plants. Pot directly into the planter with potting mix, or use with a grow pot.",  'pots1.jpg', NULL),
('3', 'Natural Lip Balm', "Natural Lip Balm that helps soothes and hydrate dry lips. All the ingredients in this lip moisturizer are 100% natural origin. Handmade and formulated without any parabens, phthalates, petrolatum or SLS.",  'balm.png', 'Flavors'),
('4', 'Monstera Plant', "Monsteras also known as the swiss cheese plants are very recognizable plants with big and beautiful leaves. They will bring life to any room in your house! They're low-maintenance plants that are great for any beginning plant owner.", 'monstera-plant.jpg', NULL),
('5', 'Essential Oil', "Handcrafted pure and natural essential oil distilled from plants as well as flower grown in my garden. For fragrance purposes only.", 'oil.jpg', 'Flavors'),
('6', 'Ceramic Planter',  "Premium ceramic planter with a drainage hole and a aesthetic design. Ideal for outdoor and indoor plants. Pot directly into the planter with potting mix, or use with a grow pot.", 'pots3.jpg', 'Size'),
('7', 'Braided Plant Hanger', "Ideal for houseplant lovers who are looking for special decor for their house. This handmade braided macrame plant hanger will fit right with any home decor style and will bring attention to your lovely plants.", 'macrame.jpg', NULL),
('8', 'Button Fern', "This is a button fern. Water once every one to two weeks and place it in indirect sunglight away from harsh sunlight or excessively dry areas. It's suitable for beginners and pet friendly!", 'fern-plant.jpg', 'Size'),
('9', 'Snake Plant', "The snake plant, commonly referred to as mother-in-law's tongue could be described as the perfect house plant; it always looks fresh but is incredibly low maintenance. It's virtually indestructible, ideal for plant lovers who travel a lot or beginners.", 'snake-plant.jpg', 'Size'),
('10', 'Planter with Saucer', "Premium planter with a drainage hole and a matching saucer. Ideal for outdoor and indoor plants. Pot directly into the planter with potting mix, or use with a grow pot.", 'pots2.jpg', NULL),
('11', 'Macrame Plant Hanger', "Ideal for houseplant lovers who are looking for special decor for their house. This handmade macrame plant hanger will fit right with any home decor style and will bring attention to your lovely plants.", 'macrame1.jpg', NULL);

insert into variants values
('1', 'small', '1', '15', '100'),
('1', 'medium', '2', '25', '100'),
('1', 'large', '3', '35','100'),

('2', 'one size', '0', '20', '100'),

('3', 'Mint', '0', '30','100'),
('3', 'Eucalyptus', '0', '30','100'),
('3', 'Rosemary', '0', '30','100'),

('4', 'one size', '0', '35', '100'),

('5', 'Eucalyptus', '0', '20', '100'),
('5', 'Lavender', '0', '20', '100'),
('5', 'Peppermint', '0', '20', '100'),

('6', 'small', '1', '10','100'),
('6', 'medium', '2', '20','100'),
('6', 'large', '3', '30','100'),

('7', 'one size', '0', '30', '100'),

('8', 'small', '1', '10','100'),
('8', 'medium', '2', '20','100'),
('8', 'large', '3', '30','100'),

('9', 'small', '1', '10','100'),
('9', 'medium', '2', '20','100'),
('9', 'large', '3', '30','100'),

('10', 'one size', '0', '25', '100'),
('11', 'one size', '0', '25', '100');


insert into filters values
('1', 'Plants'),
('1', 'Bestsellers'),

('2', 'Accessories'),
('2', 'Bestsellers'),

('3', 'Bestsellers'),
('3', 'Others'),


('4', 'Bestsellers'),
('4', 'Plants'),

('5', 'Others'), 

('6', 'Accessories'), 

('7', 'Accessories'),

('8', 'Plants'),
('8', 'Bestsellers'),

('9', 'Plants'),
('9', 'Bestsellers'),

('10', 'Accessories'),
('11', 'Accessories');







