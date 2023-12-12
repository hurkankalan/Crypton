GRANT ALL PRIVILEGES ON DATABASE crypton TO postgres;

-- Set the current database to "postgres"
\c postgres;

-- Drop the database if it exists
DROP DATABASE IF EXISTS crypton;

-- Create database "crypton"
CREATE DATABASE crypton;

-- Set the current database to "crypton"
\c crypton;

-- Create table cryptos
CREATE TABLE IF NOT EXISTS cryptos (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  currentPrice FLOAT NOT NULL,
  openingPrice FLOAT NOT NULL,
  lowestPrice FLOAT NOT NULL,
  highestPrice FLOAT NOT NULL,
  imageUrl VARCHAR(255)
);

-- Create table users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL DEFAULT 'user',
  currency VARCHAR(255) NOT NULL DEFAULT 'EUR'
);

-- Create table cryptos_users
CREATE TABLE IF NOT EXISTS cryptos_users (
  cryptos_id INTEGER NOT NULL,
  users_id INTEGER NOT NULL,
  FOREIGN KEY (cryptos_id) REFERENCES cryptos(id),
  FOREIGN KEY (users_id) REFERENCES users(id),
  PRIMARY KEY (cryptos_id, users_id)
);

-- Create table articles
CREATE TABLE IF NOT EXISTS articles (
  id VARCHAR(500) PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  summary TEXT NOT NULL,
  source VARCHAR(500) NOT NULL,
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  pageUrl VARCHAR(500) NOT NULL,
  imageUrl VARCHAR(500)
);

-- CREATE TABLE wallet
CREATE TABLE IF NOT EXISTS wallet (
  id SERIAL PRIMARY KEY,
  usersId INTEGER NOT NULL,
  accountAmount FLOAT NOT NULL DEFAULT 0,
  btcAmount FLOAT NOT NULL DEFAULT 0,
  FOREIGN KEY (usersId) REFERENCES users(id)
);

-- CREATE TABLE rss
CREATE TABLE IF NOT EXISTS rss (
  id SERIAL PRIMARY KEY,
  url VARCHAR(500) NOT NULL
);