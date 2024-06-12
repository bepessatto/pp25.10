CREATE DATABASE db_tasks;

USE db_tasks;

CREATE TABLE tasks(
	id INT auto_increment primary key,
    title VARCHAR(255) not null,
    description text,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    select * from tasks;
    
    create table empresas(
		id int auto_increment primary key,
        nome varchar(255) not null,
        endereco varchar(255) not null,
        imagem varchar(255),
        telefone varchar(255)
        );
  
  select * from empresas