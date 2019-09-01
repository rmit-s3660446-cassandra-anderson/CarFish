# Carfish Backend App

A basic Node.js app which uses the Express framework.  Implements a basic REST API for communication between the client-side angular app and our database.

## Run server

Run `npm run server` to start the server. The app will be listening on port `9000` (this can be configured if wanted). The app will automatically reload if you change any of the source files.

## Test
You can use `cURL` (a command line tool for transferring data using various protocols) to make HTTP requests to the server as a means of testing.  If you don't have it installed, you can find a good guide for how to do that [here](https://develop.zendesk.com/hc/en-us/articles/360001068567-Installing-and-using-cURL#install).

For example, making a GET request to retrieve all user information:

`curl http://localhost:9000/users`

You can also attach data as part of your request:

`curl -X POST -H "Content-Type:application/json" http://localhost:9000/users -d '{"name":"John Doe"}'`