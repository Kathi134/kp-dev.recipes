CREATE TABLE recipes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    duration INT,
    portions INT
);

CREATE TABLE ingredients (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2),
    unit VARCHAR(50),
    recipe_id BIGINT,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);
