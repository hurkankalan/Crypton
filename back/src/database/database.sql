-- Create database "crypton"
CREATE DATABASE crypton;

-- Set the current database to "crypton"
\c crypton;

-- Create table cryptos
CREATE TABLE cryptos (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  currentPrice FLOAT NOT NULL,
  openingPrice FLOAT NOT NULL,
  lowestPrice FLOAT NOT NULL,
  highestPrice FLOAT NOT NULL,
  imageUrl VARCHAR(255),
);

-- Create table users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL DEFAULT 'user',
  currency VARCHAR(255) NOT NULL DEFAULT 'EUR'
);

-- Create table cryptos_users
CREATE TABLE cryptos_users (
  cryptos_id INTEGER NOT NULL,
  users_id INTEGER NOT NULL,
  FOREIGN KEY (cryptosId) REFERENCES cryptos(id),
  FOREIGN KEY (usersId) REFERENCES users(id),
  PRIMARY KEY (cryptosId, usersId)
);


-- Create table articles
CREATE TABLE articles (
  id VARCHAR(500) PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  summary TEXT NOT NULL,
  source VARCHAR(500) NOT NULL,
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  pageUrl VARCHAR(500) NOT NULL,
  imageUrl VARCHAR(500)
);

-- CREATE TABLE wallet
CREATE TABLE wallet (
  id SERIAL PRIMARY KEY,
  usersId INTEGER NOT NULL,
  accountAmount FLOAT NOT NULL DEFAULT 0,
  btcAmount FLOAT NOT NULL DEFAULT 0,
  FOREIGN KEY (usersId) REFERENCES users(id)
);
