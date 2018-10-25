
--Dim_transactions
create table if not exists transactions( 
	transaction_id serial, 
	book_id integer not null,
	seller_id integer not null,
	buyer_id integer not null,
	qty integer not null, 
	price float not null,

	primary key (transaction_id) );

--Fact_users
create table if not exists users( 
	user_id serial, 
	name_first varchar(15) not null,
	name_last varchar(20) not null,	
	username varchar(20) not null,
	password varchar(20) not null,
	email varchar(40) not null,
	location varchar(40) not null,

	primary key (user_id) );

--Fact_books
create table if not exists books( 
	book_id serial, 
	isbn int,
	title varchar(40) not null,
	author_last varchar(20) not null,
	author_first varchar(20) not null,
	edition integer not null,
	publisher varchar(20) not null,
	cover varchar(10) not null,
	language varchar(20) not null,
	topic varchar(40) not null,

	primary key (book_id) );

--Fact_correspondance
create table if not exists correspondance( 
	book_id serial, --ISBN number
	title varchar(40) not null,
	author_last varchar(20) not null,
	author_first varchar(20) not null,
	edition integer not null,
	publisher varchar(20) not null,
	
	primary key (user_id) );
