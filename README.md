<div align="center">
  <img src="roku_frontend/public/images/roku.svg" width="200px">
</div>

# Roku Flashback
## Group Members Brody Billings and Roy Chan

<br>

This is the submission file for our groups Term 4 Roku Flashback Assignment.
<br>

A brief summary. This is a Node, Vue, Express and API based assignment. There is a database based login system used to verify the user and their profiles involved. Each profile also features a permissions level allowing them to access the regular homepage or the kids homepage showing different content based of of queries in the fetch request.

## Features Added
1. Login system that validates against the database
2. Create user. where a user can enter all their information and it be sent to the data base. Throughout this process the user can also select one of three images for their profile or check the box for it to be a childs account.
3. We were going to take the user password and send it to the all user page encrypted. We ended up setteling for a pop up that asks the user to verify the username to go to any adult profile
4. Different content and theames based on kids vs adult  
5. Videos as well as music pages for each type of user.
6. Video page features IMDB Api, Advance Search Api and Youtube Api
IMDB api is to grab in the static content, The search is pretty explanitory and the youtube is to load in the video trailer. <br>`(Must be noted all movies dont have a youtube trailer so if after everything loads and you don't see a trailer try another one)`
7. The music area has multiple different share options after you click on an album


Feel free to look at this [Google Docs](https://drive.google.com/drive/folders/12-3_ZQVZFXVWx9EEwEe8saykGqXuEGpq?usp=sharing) folder for planning and problem solving and extra assets not found in the project.

## Installation
***

### ` To run`
1. Clone the repo to your required location <br>`(If database errors occur try your www of htdocs folder)`
<br>

2. import the tables from the database folder to the database you created named `db_rokuusers` and start your mamp or wamp.

3. Open each folder into their own `visual studio code window`

4. In the ROKUUMS folder there is a config file where you will have to match your manmp or wamp credentials to.

5. We will now start with the `roku_frontend` file. Once open in visual studio code open the terminal window and download the following packages
    - npm install

6. We will now move on to the backend `rokuUMS` file. Once open in visual studio code open the terminal window and download the following packages
    - npm install
    - npm install express
    - npm install nodemon

6. After all dependencies have been downloaded open another terminal in each visual studio window and type `npm start` 

7. The `roku_frontend` terminal should say proxy set to 5050 running on local host 3000 and the `rokuUMS` should say running on local host 5050

8. Once everything is runing you can navigate to localhost:3000 in the browser and have fun playing with the node, express and vue based assignment infused with multiple API's


## Contributing
***

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

<br>

## Credits
***
HTML markup/outline [W3C](https://validator.w3.org/)
<br>
[MDN Web Docs](https://developer.mozilla.org/en-US/)
<br>
[VUE](https://vuejs.org/)
<br>
[EXPRESS](https://expressjs.com/)
<br>
[NODE](https://nodejs.org/en)
<br>
[ROUTING](https://medium.com/@fro_g/routing-in-javascript-d552ff4d2921)

## APIS
***

[IMDB Advance search API](https://imdb-api.com/API/AdvancedSearch/)
<br>
[IMDB/Youtube trailers](https://imdb-api.com/en/API/YouTubeTrailer/)
<br>
[Commenting](https://www.googleapis.com/youtube/v3/commentThreads)

<br>


## License
***
MIT License

Copyright (c) 2023 Brody Billings

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
