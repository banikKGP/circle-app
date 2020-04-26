# home-automation-api

This is the API server runs on the PORT 9000

# CODE Structure

Every component has 4 parts i.e. Controller, Manager, Model and Schema which are under app_modules.

Controller is responsible for receiving and sending HTTP requets.
Manager is reponsible for the business logic for all API requests.
Model is doing all the DB operations.
Schema holds the DB structure of every component

auth-module is resposible for validating all API request using JWT web token.

utils is useful for all kind of utility nethods and holds the constant file.

# Framework

express.js 

# Database

The entire application is based on MongoDB

# Restrictions

To start the application, .env file is required which is not available within the codebase for security concerns.

# Prerequisite

Docker is needed to the start entire project. Please make sure docker is running in the system and 9000 & 4200 ports are free to use.

# Project building

Once docker is up, in the bash terminal please run `bash start.sh` to start the application and once the build is fininshed please open `http://localhost:4200`.

# Log Files

application log files can be found in `/tmp/api_logs/home-automation-logs` and the action logs can be found in `/tmp/api_logs/home-automation-action-logs`