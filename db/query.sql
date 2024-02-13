CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    surname VARCHAR(100),
);

CREATE TABLE contact_details(
    id INTEGER REFERENCES students(id) UNIQUE,
    -- Foreign key 
    tel TEXT,
    address TEXT
);

-- Insert Query
INSERT INTO
    students (name, age)
VALUES
    ('John', 25);

INSERT INTO
    contact_details (id, tel, address)
VALUES
    (1, '123456789', '1234 Main St PUNE');

-- JOIN Query
SELECT
    *
FROM
    students
    JOIN contact_details ON students.id = contact_details.id;

SELECT
    *
FROM
    students
    INNER JOIN contact_details ON students.id = contact_details.id;

-- INNER JOIN  allow