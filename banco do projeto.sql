create database bd_pessatto;

use bd_pessatto;

    create table empresas(
		id int auto_increment primary key,
        nome varchar(255) not null,
        endereco varchar(255) not null,
        imagem varchar(255),
        telefone varchar(255),
        user_id int,
        foreign key (user_id) references users (id)
        );

  select * from empresas;

  drop table empresas;

  DELETE from empresas
  WHERE id > 0;
  
  create table users(
	id int not null auto_increment primary key,
    name varchar(255) not null,
    email varchar(255) not null unique,
    password varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);
 
alter table users add column tipo enum ("Refugiado", "Apoiador");
 

select * from users;
 
  DELETE from users
  WHERE id > 0;
 
  select * from empresas;
  INSERT INTO empresas(nome, endereco, imagem, telefone) VALUES('teste', 'teste', '1730116936758.jfif', 'a')