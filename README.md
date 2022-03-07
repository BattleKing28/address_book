Project structure -
main file - server.js
configs -
ENV variables
db.js - Connection with mongo DB
./models -
Contact.js - Schema for Contact values
User.js - Schema for a user account
./roues -
containing all the routes for the api
./controllers -
contains all the functionality of routes
./middleware -
contains error response , authentication and async middleware

To use your own Mongo DB databse for running this project
In ./configs/configs.env - Enter your Own mongo_uri string obtained from mongodb atlas

To run this project -
Download the zip from the link
Extract the folder on tha local machine
Open a terminal in the folder (Or open the project in vscode)
first command - npm install
then , npm run dev
