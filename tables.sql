-- ORIGINAL TABLE CREATION
CREATE TABLE "tasks" (
"id" SERIAL PRIMARY KEY,
"name" VARCHAR(40) not null,
"description" VARCHAR(120),
"due_date" DATE not null,
"complete" BOOLEAN default false);

-- Test Inserts (used for add-task.js)
INSERT INTO "tasks"
("name", "description", "due_date")
VALUES ('weekend challenge 3', 'to-do list', '03/26/2017');

INSERT INTO "tasks"
("name", "description", "due_date")
VALUES ('make tea', 'boil water, steep tea, drink', 'now');

-- Test Updates
UPDATE "tasks"
SET "due_date" = '03/27/2017'
WHERE "id" = 3;

UPDATE "tasks"
SET "complete" = true
WHERE "id" = 4;

-- Used for get-tasks.js
SELECT * FROM "tasks";

-- Test for delete-task.js
DELETE FROM "tasks" WHERE "id" = 10;

-- Test for update-task.js
UPDATE "tasks" SET "complete" = true WHERE "id" = 3;
