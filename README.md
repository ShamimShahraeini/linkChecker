# linkChecker
This is gonna check if requested links are valid and they'll return a valid content(for instance by content here we mean a file for)

* clone the project

* cd to project directory

* run `npm i` to install dependencies

* run `node index.js` or `npm start`

* then request to the server:

    * request with POST method to url:*http://localhost:8080/linkService* with body format like: ```{
    "link": <"urRequestedLink">
}``` to ask a file to be downloaded by passing its link :)

    * request with GET method to url:*http://localhost:8080/linkService* to get the list of links that are gonna be downloaded :)
