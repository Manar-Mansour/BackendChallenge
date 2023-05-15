# Backend Challenge

## To create the postgres database, write the following commands in psql in order:

1. psql -U postgres
   Enter your password for the postgres user
2. CREATE USER full_stack_user WITH PASSWORD 'password123';
3. CREATE DATABASE issues;
4. CREATE DATABASE issues_test;
5. GRANT ALL PRIVILEGES ON DATABASE issues TO full_stack_user;
6. GRANT ALL PRIVILEGES ON DATABASE issues_test TO full_stack_user;
7. \c issues
8. GRANT ALL ON SCHEMA public TO full_stack_user;
9. \dt
   to view tables created
10. \c issues_test
11. GRANT ALL ON SCHEMA public TO full_stack_user;

## To run the project from the Docker image, write the following commands in your terminal

1. docker pull manarmansour/issue_api:latest
2. docker run -it manarmansour/issue_api:latest

##To run the project without using Docker do the following:

1. Clone this repo
2. Run `npm install`
3. Run `npm start`
