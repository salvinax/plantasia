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
('1', 'ZZ Plant Potted', 'Great plant. So easy to take care of.', '/plant-overview.png','Size'),
('2', 'Hosta Plant', 'Great plant. So easy to take care of.',  '/plant-overview.png', 'Size'),
('3', 'Red Roses', 'Great plant. So easy to take care of.',  '/plant-overview.png', NULL);

insert into variants values
('1', 'small', '1', '20', '100'),
('1', 'medium', '2', '30', '100'),
('1', 'large', '3', '40','100'),

('2', 'small', '1', '20','100'),
('2', 'medium', '2', '30','100'),
('2', 'large', '3', '40','100'),

('3', 'one size', '0', '30','100');


insert into filters values
('1', 'Plants'),
('1', 'Accessories'),
('1', 'Bestsellers'),

('2', 'Others'),
('2', 'Plants'),
('2', 'Bestsellers'),
('3', 'Others');


