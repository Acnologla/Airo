CREATE EXTENSION pgcrypto;

CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    username varchar(50) NOT NULL,
    password TEXT NOT NULL,
    created TIMESTAMP NOT NULL
);

CREATE TABLE Posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    content TEXT NOT NULL,
    author INT REFERENCES Users (id) NOT NULL,
    created TIMESTAMP NOT NULL
);

CREATE TABLE Comments (
    id SERIAL PRIMARY KEY,
    postId INT REFERENCES Posts (id),
    commentId INT REFERENCES Comments (id),
    author INT REFERENCES Users (id) NOT NULL,
    content TEXT NOT NULL,
    created TIMESTAMP NOT NULL
)