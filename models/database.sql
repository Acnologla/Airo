CREATE EXTENSION pgcrypto;

CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    username varchar(50) NOT NULL,
    password TEXT NOT NULL,
    created  TIMESTAMPTZ  NOT NULL
);

CREATE TABLE Posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    content TEXT NOT NULL,
    author INT REFERENCES Users (id) ON DELETE CASCADE NOT NULL,
    created TIMESTAMPTZ NOT NULL
);

CREATE TABLE Comments (
    id SERIAL PRIMARY KEY,
    postId INT REFERENCES Posts (id) ON DELETE CASCADE,
    commentId INT REFERENCES Comments (id) ON DELETE CASCADE,
    author INT REFERENCES Users (id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    created TIMESTAMPTZ NOT NULL
);

CREATE TABLE Upvote (
    isDislike BOOLEAN NOT NULL,
    author INT REFERENCES Users (id) ON DELETE CASCADE NOT NULL,
    postId INT REFERENCES Posts (id) ON DELETE CASCADE,
    commentId INT REFERENCES Comments (id) ON DELETE CASCADE
)
