# Quiz Generator
Project 3 submission for the General Assembly Software Engineering Immersive.

Team members: 
* Brendan Fox
* David Kuperman
* Michael Zhao
* Shiam Dulla

## Introduction
Quiz Generator uses chatGPT to automatically generate interactive quizzes on any topic supplied by the user.

## List of features
1. Automatically generate custom quizzes using a Large Language Model (provided by the OpenAI ChatGPT API)
1. Save quizzes, browse quizzes, delete quizzes
1. Share quizzes with friends

## Technologies used
1. Express.js web server run on Node.js 
1. Postgres database
1. Bootstrap CSS
1. AJV JavaScript library for JSON object validation
1. JavaScript front end Single Page App

## Architecture
Below is the image of the basic architecture of the app including front-end, back-end and integration with OpenAI chatGPT API:
![Diagram showing the app architecture]('Architecture diagram.PNG') 

Below is a diagram showing the db schema: 
![Diagram showing the database structure]('DB diagram.PNG') 

## Future features
1. Using questions that the user has got wrong to influence the future set of questions provided to user, e.g. asking questions focused on areas that the user has struggled with  
