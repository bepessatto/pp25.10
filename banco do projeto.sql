create database bd_pessatto;
 
use bd_pessatto;
 
    create table empresas(
		id int auto_increment primary key,
        nome varchar(255) not null,
        endereco varchar(255) not null,
        imagem varchar(255),
        telefone varchar(255)
        );
  select * from empresas;
  DELETE from empresas
  WHERE id > 0;
  create table users(
	id int not null auto_increment primary key,
    name varchar(255) not null,
    email varchar(255) not null unique,
    password varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    tipo enum ("Refugiado", "Apoiador")
);
 
select * from users;
  DELETE from users
  WHERE id > 0;