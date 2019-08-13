
# API Documentation

#### 1️⃣ Backend deployed at [https://mympy-dreamers-staging.herokuapp.com/]

## 1️⃣ Getting started

To get the server running locally:

🚫 adjust these scripts to match your project

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm run test** to start server using testing environment




### Backend framework goes here

Accessibility and clarity comes with route specifications, therefore it's easier to have the server route to the following:

## 2️⃣ POST Endpoints:

The following are required fields in order to successfully POST to specified urls:

### Dreams:

`/api/dreams`

#### Notes:

`dreampic` requires additional logic and research (cloudinary) to be able to add images to the database.

    {
      id: INTEGER (PK++),
      dream_name: VARCHAR 128,
      dream_short_description: TEXT,
      dream_long_description: TEXT,
      donations_received: INTEGER 128,
      user_id: INT (FK),
      dreampic: VARCHAR
    }

### Cloudinary

Company Website: https://www.cloudinary.com/	

Cloudinary is a service that allows users to store and retrieve images for use on websites. Our application uses a back-end implementation of cloudinary whereby the image is uploaded to cloudinary and the subsequent URL that is served up by the service is stored in a database along with the project id with which it is associated. On the front-end, the URL for the image is retrieved from the database and used as background image for each project using string interpolation. 


### Users:

#### Notes:

Login and Signup is taken care by 0auth. Profile picture uploads are taken care of by cloudinary. Email messaging system is taken care of by sendgrid.

`/api/users`

    {
      id: INTEGER (PK++),
      username: VARCHAR 128,
      password: VARCHAR 128,
      email: VARCHAR 128
    }

`/api/user-info`

### User Info:

    {
      id: INTEGER (PK++)
      first_name: VARCHAR 128,
      last_name: VARCHAR 128,
      bio: TEXT,
      city: VARCHAR 128,
      state: VARCHAR 128,
      profile_pic: VARCHAR,
      user_id: INTEGER (FK)
    }

## GET Endpoints

The following outputs will differ from the post schema previously stated:

### Users:

`/api/users`

    {
      id: INTEGER (PK++),
      username: VARCHAR 128,
      password: VARCHAR 128,
      email: VARCHAR 128
    }

#### `/api/users/:id`



    {
      id: INTEGER (PK++),
      username: VARCHAR 128,
      password: VARCHAR 128,
      email: VARCHAR 128,
      userInfo: {
                  id: INTEGER (PK++)
                  first_name: VARCHAR 128,
                  last_name: VARCHAR 128,
                  bio: TEXT,
                  city: VARCHAR 128,
                  state: VARCHAR 128,
                  profile_pic: VARCHAR,
                  user_id: INTEGER (FK)
                },
      dreams: [
                {
                  id: INTEGER (PK++),
                  dream_name: VARCHAR 128,
                  dream_short_description: TEXT,
                  dream_long_description: TEXT,
                  donations_received: INTEGER 128,
                  user_id: INT (FK),
                  dreampic: VARCHAR
                }
              ]
    }

#### `/api/users/:id/dreams`

Shows all the dreams associated with the user id.

i.e. outputs this for `/api/users/2/dreams`:

    {
            "id": 2,
            "dream_name": "Save the ocean",
            "dream_short_description": "Ocean is dying we need to save it",
            "dream_long_description": "Let save all those rare fish and animals for future generation",
            "donations_received": 230,
            "donation_goal": 500,
            "dreampic": "www.sea.com/fish.jpg",
            "user_id": 2
        },
        {
            "id": 5,
            "dream_name": "Better education for Orphans",
            "dream_short_description": "Better life in future",
            "dream_long_description": "Not to be involve in crime, drug dealing, killing people",
            "donations_received": 70,
            "donation_goal": 800,
            "dreampic": "www.orphanseducation.com/orphans.com",
            "user_id": 2
        }



## Dreams Routes:

| Method | Endpoint                | Access Control | Description                          |
| ------ | ----------------------- | -------------- | -------------------------------------|
| GET    | `/`                     | all users      | Returns info for all dream projects. |
| GET    | `/:id`                  | all users      | Returns info for a dream project pertaining to an id.    |
| PUT    | `/:id`                  | restricted     | Modify an existing dream project.    |
| DELETE | `/:id`                  | restricted     | Delete a dream.                      |
| POST   | `/`                     | restricted     | Post a new dream project.            |

## User Routes:

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/`                     | restricted          | Returns all users for a user.                      |
| GET    | `/:id          `        | restricted          | Returns all properties for a single user.          |
| GET    | `/:id/dreams          ` | restricted          | Dreams belonging to a specific user.               |
| PUT    | `/:id`                  | restricted          | Edit a user's information.                         |
| DELETE | `/:id`                  | restricted          | Delete a user's information.   


### Auth0 Authentication and Authorization form Client side

Create an Auth0Client instance before rendering or initializing your application. You should only have one instance of the client.

//with async/await
const auth0 = await createAuth0Client({
  domain: '<AUTH0_DOMAIN>',
  client_id: '<AUTH0_CLIENT_ID>',
  redirect_uri: '<MY_CALLBACK_URL>'
});

//with promises
createAuth0Client({
  domain: '<AUTH0_DOMAIN>',
  client_id: '<AUTH0_CLIENT_ID>',
  redirect_uri: '<MY_CALLBACK_URL>'
}).then(auth0 => {
  //...
});


## 1 - Login
<button id="login">Click to Login</button>
//with async/await

//redirect to the Universal Login Page
document.getElementById('login').addEventListener('click', async () => {
  await auth0.loginWithRedirect();
});

//in your callback route (<MY_CALLBACK_URL>)
window.addEventListener('load', async () => {
  const redirectResult = await auth0.handleRedirectCallback();
  //logged in. you can get the user profile like this:
  const user = await auth0.getUser();
  console.log(user);
});



## 2 - Calling an API
<button id="call-api">Call an API</button>
//with async/await
document.getElementById('call-api').addEventListener('click', async () => {
  const accessToken = await auth0.getTokenSilently();
  const result = await fetch('https://myapi.com', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  const data = await result.json();
  console.log(data);
});

//with promises
document.getElementById('call-api').addEventListener('click', () => {
  auth0
    .getTokenSilently()
    .then(accessToken =>
      fetch('https://myapi.com', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
    )
    .then(result => result.json())
    .then(data => {
      console.log(data);
    });
});


## 3 - Logout
<button id="logout">Logout</button>
import createAuth0Client from '@auth0/auth0-spa-js';

document.getElementById('logout').addEventListener('click', () => {
  auth0.logout();
});


## About Auth0

-Helps to implement authentication with multiple identity providers, including social (e.g., Google, Facebook, Microsoft, LinkedIn, GitHub, Twitter, etc), or enterprise (e.g., Windows Azure AD, Google Apps, Active Directory, ADFS, SAML, etc.)

-log in users with username/password databases, passwordless, or multi-factor authentication
link multiple user accounts together

Helps to generate signed JSON Web Tokens to authorize your API calls and flow the user identity securely

Helps to access demographics and analytics detailing how, when, and where users are logging in
enrich user profiles from other data sources using customizable JavaScript rules

## User Info Routes:

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/`                     | restricted          | Returns all user profiles.                         |
| GET    | `/:id          `        | restricted          | Returns info for a single user.                    |
| POST   | `/`                     | restricted          | Post a new user profile.                           |
| PUT    | `/:id`                  | restricted          | Edit a user's profile.                             |
| DELETE | `/:id`                  | restricted          | Delete a user's profile.                           |



## 2️⃣ Actions

### Notes:

There will be different logic for both types of get requests (for a single user and for all users) due to adding the `dreams` and `userInfo` properties.

## Dreams:

#### getDreams()

- Returns all dreams

#### getDreamById(id)

- Returns dreams pertaining to an ID.

#### addDream(dream)

- Adds the request into the database

#### updateDreams(id, changes)

- Update a dream by ID

#### deleteDreams(id)

- Delete a dream by ID



## Users:

#### getUsers()

- Returns all users with added table properties of `dreams` and `userInfo`.

#### getUser(id)

- Returns the user with linked `dreams` and `userInfo` properties.

#### getUserDreams(id)

- Returns the list of associated dreams with user-specific id. 
 * This will just be a filtered array of dreams only pertaining to the specified user.
 * The route would be `/:id/dreams`

#### addUser(userObject)

- Creates a new user and returns that user. 

#### updateUser(id, changes)

- Updates a single user by ID.
- Changes to the password must include hash logic, similar to login logic.

#### deleteUser(id)

- deletes specified user object on CASCADE.

## User Infos:

#### getUserInfos()

- Get all user profiles.

#### getUserInfo(id)

- Get the profile of a single user.

#### addUserInfo(id)

- Adds a new profile.

#### editUserInfo(id)

- Edits user profile

#### deleteUserInfo(id)

- Deletes the user's profile.




## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:
    
    PORT=5000//whatever port
    HOST=localhost
    DB_DEV=mympy
    DB_TEST=mympy_test
    USER=<YOUR POSTGRES PGADMIN USERNAME> default postgres
    PASS=<YOUR POSTGRES PGADMIN PASSWORD>
    BE_URL=http://localhost:5000
    FE_URL=http://localhost:3000
    DB_ENV=testing
    
## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [https://github.com/mympy-dreamers/Frontend]  for details on the frontend of our project.


