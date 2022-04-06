CREATE EXTENSION IF NOT EXISTS 'uuid-ossp';
CREATE EXTENSION IF NOT EXISTS 'pgcrypto'

CREATE TABLE IF NOT EXISTS aplication_users (
    uuid uuid DEFAULT uuid_generate_v4(),
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY (uuid)
) 

INSERT INTO aplication_users (username, password) VALUES ('Admin', crypt('admin', 'my_key'))