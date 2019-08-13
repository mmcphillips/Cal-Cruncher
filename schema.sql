DROP DATABASE IF EXISTS cal;

CREATE DATABASE cal;

\c cal;

DROP TABLE IF EXISTS foodlog;

CREATE TABLE foodlog(
  id serial PRIMARY KEY,
  dayte VARCHAR(40),
  meal VARCHAR(30),
  cal int,
  servings integer,
  totalcal integer
);

--psql -U postgres -f featuresSchema.sql
