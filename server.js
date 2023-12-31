// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3050;


/* Spin up the server*/
const server = app.listen(port, listening);
 function listening(){
    console.log(server);
    console.log(`running on localhost: ${port}`);
  };

//GET request
app.get("/AllData", async (request, response) => {
        response.send(projectData);
    }
);
 
  //POST request 
app.post('/AddData', async (request, response) => {
    console.log(request.body);
    const info = await request.body;
        projectData = {
            temp:request.body.temp,
            date:request.body.date,
            content:request.body.content
         };
         
    response.send(projectData);
});

