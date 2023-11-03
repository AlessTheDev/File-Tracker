-- Create the database
CREATE DATABASE file_tracker;

-- Connect to the database
\c file_tracker

-- Enable the uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE category (
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL,
    icon_url VARCHAR(200) NOT NULL DEFAULT 'https://cdn-icons-png.flaticon.com/512/6747/6747196.png',
    CONSTRAINT icon_url_extension_check CHECK (
        icon_url ~* '^.+\.(png|ico|svg|jpeg|jpg|webp)$'
    )
);

CREATE TABLE file_info (
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    title VARCHAR(20) NOT NULL,
    file_path VARCHAR(500) NOT NULL UNIQUE,
    file_description VARCHAR(50),
    category_id UUID REFERENCES category(id) NOT NULL
);

CREATE VIEW file_overview AS 
SELECT 
    file_info.id AS file_info_id, 
    file_info.title, 
    file_info.file_path, 
    file_info.file_description, 
    category.id AS category_id, 
    category.category_name, 
    category.icon_url
FROM file_info 
JOIN category ON file_info.category_id = category.id;

