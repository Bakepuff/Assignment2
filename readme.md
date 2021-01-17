# Assignment 2 - Web API.

Name: TanShi

## Features.

...... A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** ......,
 
 + Feature 1 - Users can get a list of actors
 + Feature 2 - Users can get actor information based on actor ID
 + Feature 3 - Users can get upcoming movies list 
 + Feature 4 - Users can get upcoming movies based on ID
 + Feature 5 - Users can get top-rated movies
 + Feature 6 - Users can get top rated movies based on ID
 + Feature 7 - Users can get the detailed information of the movie according to the id of the movie
 + Feature 8 - Users can get movie reviews based on movie id
 + Feature 9 - Users can get similar movies based on movie id
 + Feature 10 - Users can get credits based on movie id
 + Feature 11 - Users can get credits details according to the id of the movie
 + Feature 12 - Users can put upcoming movies
 + Feature 13 - Users can delete upcoming movies
 + Feature 14 - Users can put toprated movies
 + Feature 15 - Users can delete toprated movies

## Installation Requirements

Describe what needs to be on the machine to run the API (Node v?, NPM, MongoDB instance, any other 3rd party software not in the package.json). 

Describe getting/installing the software, perhaps:

```bat
git clone http:\myrepo.git
```

followed by installation

```bat
git install
npm install --save-dev babel-plugin-inline-json-import
```

## API Configuration
Describe any configuration that needs to take place before running the API. For example, creating an ``.env`` and what variables to put in it. Give an example of how this might be structured/done.
REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

```bat
NODE_ENV=development
PORT=8080
HOST=localhost
TMDB_KEY=MYTMDBKEY
mongoDB=mongodb+srv://TanShi:<password>@cluster0.mfjv3.mongodb.net/<dbname>?retryWrites=true&w=majority
SEED_DB=false
SECRET=ilikecake
```


## API Design
Give an overview of your web API design, perhaps similar to the following: 

|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies |Gets a list of movies | N/A | N/A |
| /api/movies/{movieid} | Get a Movie | N/A | N/A | N/A
| /api/movies/{movieid}/reviews | Get all reviews for movie | Create a new review for Movie | N/A | N/A  
| /api/movies/{movieid}/similar| Get similar movie for a movie | N/A | N/A | N/A
| /api/movies/{movieid}/credit| Get credits list for a movie | N/A | N/A | N/A
| /api/movies/{movieid}/creditDetail| Get credit detail for a movie | N/A | N/A | N/A
| /api/toprated| Gets a list of toprated movies | N/A | N/A | N/A
| /api/toprated/{topratedid}| Gets a toprated movie | N/A | update an toprated movie | delete an toprated movie
| /api/upcoming| Gets a list of upcoming movies | N/A | N/A | N/A
| /api/upcoming/{upcomingid}| Gets an upcoming movie | N/A | update an upcoming movie | delete an upcoming movie
| /api/user| Gets a list of user | N/A | N/A | N/A
| /api/users/{userid}| N/A | N/A | update a user | N/A
| /api/users/{username}/favourites| Get Movie Favourites | Add a movie to favourites | N/A | N/A
| /api/toprated| Gets a list of toprated movies | N/A | N/A | N/A
| /api/actors| Get a list of actors | N/A | N/A | N/A
| /api/actors/{actorid}| Get details of one actor | N/A | N/A | N/A


If you have your API design on an online platform or graphic, please link to it (e.g. [Swaggerhub](https://app.swaggerhub.com/)).

[swagger link]:https://moviesapi-staging.herokuapp.com/

## Security and Authentication
Give details of authentication/ security implemented on the API(e.g. passport/sessions). Indicate which routes are protected.
~~~Javascript
import passport from 'passport';
import passportJWT from 'passport-jwt';
import UserModel from './api/users/userModel';
import dotenv from 'dotenv';

dotenv.config();

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromHeader('authorization');
jwtOptions.secretOrKey = process.env.SECRET;
const strategy = new JWTStrategy(jwtOptions, async (payload, next) => {
  const user = await UserModel.findByUserName(payload);
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
passport.use(strategy);

export default passport; 

~~~
~~~Javascript
import User from '../api/users/userModel';
// Authentication and Authorization Middleware
export default async (req, res, next) => {
  if (req.session && req.session.authenticated) {
    let user = await User.findByUserName(req.session.user);
    if (!user)
    return res.status(401).json({status:401,message:"unauthorised"});
    next();
  } else {
    return res.status(401).json({status:401,message:"unauthorised"});
  }
};

~~~

Protected routes:
+  /api/toprated  Get
+  /api/toprated/  Put
+  /api/toprated  Delete
+  /api/movies/{movieid} Get
+  /api/movies/{movieid}/similar  Get
+  /api/movies/{movieid}/credit   Get
+  /api/movies/{movieid}/creditDetails Get
+  /api/movies/{movieid}/reviews Get Post
+  /api/actor     Get
+  /api/actor/{actorid}    GET

## Integrating with React App

Describe how you integrated your React app with the API. Perhaps link to the React App repo and give an example of an API call from React App. For example: 

~~~Javascript
export const getMovies = () => {
  return fetch(
     '/api/movies',{headers: {
       'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then(res => res.json());
};

~~~

## Extra features

. . Briefly explain any non-standard features, functional or non-functional, developed for the app.  

## Independent learning.

. . State the non-standard aspects of React/Express/Node (or other related technologies) that you researched and applied in this assignment . .  

# Assignment 2 - Agile Software Practice.

Name: TanShi

## Target Web API.

...... Document the Web API that is the target for this assignment's CI/CD pipeline. Include the API's endpoints and any other features relevant to the creation of a suitable pipeline, e.g.

+ Get /api/movies - returns an array of movie objects.
+ Get /api/movies/:id - returns detailed information on a specific movie.
+ Post /api/users?action=register -  return 201 when register a new user
+ Get /api/users - return a users list
+ Get /api/users/username/favourites - return the favourite list
+ Get /api/upcoming - return upcoming list
+ Get /api/upcoming/upcomingID - return a specifc upcoming movie
+ Delete /api/upcoming/upcomingID - return 200 and delete successfully
+ Get /api/genres - return genres list

## Error/Exception Testing.

.... From the list of endpoints above, specify those that have error/exceptional test cases in your test code, the relevant test file and the nature of the test case(s), e.g.

+ Get /api/movies/movieID - test when the movieID is invalid. Test adding a movie with invalid ID. See _tests_/movie.spec.js 
+ Post /api/users/username/favourites - test when the movieID is unexisted. Test posting an unexisted movie. See _tests_/user.spec.js 
+ Post /api/users?action=register - test when the new password not comply with the rule. Test adding a password with no number. See _tests_/user.spec.js 
+ Put/api/upcoming/movieID - test when the upcoming movie id is unexisted. Test putting a movie with unexisted id. See _tests_/upcoming.spec.js
+ Delete/api/upcoming/movieID - test when the delete movie id is unexisted. Test delete a movie with unexisted id. See _tests_/upcoming.spec.js

## Continuous Delivery/Deployment.

..... Specify the URLs for the staging and production deployments of your web API, e.g.

+ https://dashboard.heroku.com/apps/moviesapi-staging - Staging deployment
+ https://dashboard.heroku.com/apps/movies-apiproduction - Production

.... Show a screenshots from the overview page for the two Heroku apps e,g,

+ Staging app overview 

![][stagingapp]

+ Production app overview 

![][productionapp]


## Feature Flags (If relevant)

... Specify the feature(s) in your web API that is/are controlled by a feature flag(s). Mention the source code files that contain the Optimizerly code that implement the flags. Show screenshots (with appropriate captions) from your Optimizely account that prove you successfully configured the flags.


[stagingapp]: ./img/stagingapp.png
[productionapp]: ./img/productionapp.png