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
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  currentPrice FLOAT NOT NULL,
  openingPrice FLOAT NOT NULL,
  lowestPrice FLOAT NOT NULL,
  highestPrice FLOAT NOT NULL,
  imageUrl VARCHAR(255),
  isVisibleToGuests BOOLEAN DEFAULT FALSE
);

-- Create table users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL DEFAULT 'user',
  currency VARCHAR(255) NOT NULL DEFAULT 'EUR',
  connectType SMALLINT NOT NULL DEFAULT 0 -- 0 = local, 1 = discord
);

-- Create table articles
CREATE TABLE IF NOT EXISTS articles (
  id VARCHAR(500) PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  summary TEXT NOT NULL,
  source VARCHAR(500) NOT NULL,
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  pageUrl VARCHAR(500) NOT NULL,
  imageUrl VARCHAR(500),
  isVisibleToGuests BOOLEAN DEFAULT FALSE
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

CREATE TABLE IF NOT EXISTS crypto_history (
  id SERIAL PRIMARY KEY,
  crypto_id VARCHAR(255) NOT NULL,
  period VARCHAR(255) NOT NULL,
  opening_price FLOAT NOT NULL,
  highest_price FLOAT NOT NULL,
  lowest_price FLOAT NOT NULL,
  closing_price FLOAT NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  FOREIGN KEY (crypto_id) REFERENCES cryptos(id)
);