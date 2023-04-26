# Quiz Generator
Project 3 submission for the General Assembly Software Engineering Immersive.

Team members: 
* Brendan Fox
* David Kuperman
* Michael Zhao
* Shiam Dulla

## Introduction
Quiz Generator is a web application that leverages the power of OpenAI's ChatGPT API to automatically generate interactive quizzes on any topic supplied by the user. The application provides a seamless experience for users to create, save, browse, and delete quizzes, as well as share them with friends.

## List of features
1. Quiz Generation: Users can input a topic of their choice, and the application uses the OpenAI ChatGPT API to automatically generate a     custom quiz with multiple-choice questions.
1. Quiz Management: Users can save quizzes they generate, browse their saved quizzes, and delete quizzes they no longer need.
1. Share Quizzes: Users can easily share quizzes with their friends through a generated link, allowing others to take the quiz.

## Technologies used
1. Express.js web server run on Node.js 
1. Postgres database
1. Bootstrap CSS
1. AJV JavaScript library for JSON object validation
1. JavaScript front end Single Page App

## Architecture
The application follows a client-server architecture, with the frontend and backend communicating through API endpoints. The backend server is built using Express.js and connects to a Postgres database for storing and retrieving quizzes. The frontend is built as a SPA using JavaScript, with Bootstrap CSS for styling. The OpenAI ChatGPT API is integrated into the backend server to generate quizzes based on user input topics.

Below is the image of the basic architecture of the app including front-end, back-end and integration with OpenAI chatGPT API:
![Diagram showing the app architecture]('Architecture diagram.PNG') 

Below is a diagram showing the db schema: 
![Diagram showing the database structure]('DB diagram.PNG') 

## Future features
1. Personalized Quizzes: Utilizing user feedback on questions they got wrong to influence the generation of future quizzes, such as asking questions focused on areas that the user has struggled with, providing a more personalized learning experience.
1. User Accounts: Implementing user accounts and authentication to allow users to save and manage their quizzes across different sessions.
1. Quiz Customization: Allowing users to customize the generated quizzes by specifying the number of questions, difficulty level, and other parameters.
1. Quiz Statistics: Providing users with statistics on their quiz performance, such as accuracy, time taken, and progress tracking. 
