-- Create database "crypton"
CREATE DATABASE "crypton";

-- Set the current database to "crypton"
\c crypton;

-- Create table "user"
CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) DEFAULT 'user' NOT NULL
);

-- Create table "articles"
CREATE TABLE articles (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255),
  summary TEXT,
  source VARCHAR(255),
  date TIMESTAMP,
  pageUrl VARCHAR(255),
  imageUrl VARCHAR(255)
);