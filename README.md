# linkChecker
This is gonna check if requested links are valid and they'll return a valid content(for instance by content here we mean a file for)

* clone the project

* cd to project directory

* create file "downloadList.txt" 

* run `npm i` to install dependencies

* install aria2 `apt install aria2`

* use `setcap 'cap_net_bind_service=+ep' $(which node)` to allow linux use port 80

* run `node index.js` or `npm start`

* then request to the server(check with postman):

    * request with POST method to url:*http://localhost:8080/linkService* with body format like: ```{
    "link": <"urRequestedLink">
}``` to ask a file to be downloaded by passing its link :)

    * request with GET method to url:*http://localhost:8080/linkService* to get the list of links that are gonna be downloaded :)

    * request to http://localhost:8080/ (or http://127.0.0.1:8080/public/) to get served static contet ==> frontend

