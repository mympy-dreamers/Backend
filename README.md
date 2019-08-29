
# API Documentation

#### Backend deployed at [https://mympy-dreamers-staging.herokuapp.com/]

## 1️⃣ Getting started

To get the server running locally:

🚫 adjust these scripts to match your project

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm run test** to start server using testing environment




## :two: BACKEND FRAMEWORK:

We used:
- NodeJS
- Express
- Cloudinary
- Stripe
- Auth0
- Cors (middleware)

## :three: ROUTES:

### Authentication routes:

#### **`/auth/zero`**

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| POST   | `/register`             | all users           | Registers a new user with auth0.                   |
| POST   | `/login`                | all users           | Signs in a user with auth0.                        |


### User Routes:

#### **`/api/users`**

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/`                     | restricted          | Returns all users for a user.                      |
| GET    | `/:id `                 | restricted          | Returns all properties for a single user.          |
| GET    | `/:id/dreams`           | restricted          | Dreams belonging to a specific user.               |
| PUT    | `/:id`                  | restricted          | Edit a user's information.                         |
| DELETE | `/:id`                  | restricted          | Delete a user's information.                       |

### User Info Routes: 

**NOTE: Not Implemented until next feature canvas as on 8/28/19**

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/`                     | restricted          | Returns all user profiles.                         |
| GET    | `/:id          `        | restricted          | Returns info for a single user.                    |
| POST   | `/`                     | restricted          | Post a new user profile.                           |
| PUT    | `/:id`                  | restricted          | Edit a user's profile.                             |
| DELETE | `/:id`                  | restricted          | Delete a user's profile.                           |


### Dream Routes:

#### **`/api/dreams`**

| Method | Endpoint                | Access Control | Description                          |
| ------ | ----------------------- | -------------- | -------------------------------------|
| GET    | `/`                     | all users      | Returns info for all dream projects. |
| GET    | `/:id`                  | all users      | Returns info for a dream project pertaining to an id. |
| GET    | `/:id/journals`         | all users      | Returns all journals pertaining to a dream project. |
| POST   | `/`                     | restricted     | Post a new dream project.            |
| PUT    | `/:id`                  | restricted     | Modify an existing dream project.    |
| DELETE | `/:id`                  | restricted     | Delete a dream.                      |


### Journal Routes:

#### **`/api/journals`**

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/`                     | All Users           | Returns all journals for a user.                   |
| GET    | `/:id`                  | All Users           | Returns all properties for a single journal.       |
| POST   | `/`                     | restricted          | Posts a new journal entry.                         |
| PUT    | `/:id`                  | restricted          | Edits a journal's body.                            |
| DELETE | `/:id`                  | restricted          | Delete a user's information.                       |

### Payment Routes:

#### Notes: 

The route to start the transaction is through **`/stripe/charge`**. Susequently, the app posts to both:

- :one: The **`userpayment`** table to track each user's transaction.
- :two: The **`dream-payment`** table to track each dream's transaction.

Therefore, overall, you send a post request to **`/stripe/charge`** which will then post to userpayment and dream-payment.


| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| POST   | `/stripe/charge`        | All Users           | Initial route that starts the payment transactions.|
| GET    | `/userpayment/:id`      | All Users           | Returns a specified user's payment transaction.    |
| POST   | `/userpayment`          | All Users           | Posts a new user payment.                          |
| GET    | `/dreampayment/:id`     | All Users           | Returns a specified dream's payment transaction.   |
| POST   | `/dreampayment`         | All Users           | Posts a new dream payment transaction.             |


### Images route:

#### **`/api/images`**

#### Notes:

- :one: A post request to `/api/images` actually sends a request to the third party api cloudinary. We pass in the image and the `dream_id`.
- :two: Cloudinary uploads and saves the image and returns an object that has the url of the image, which we select as `result.url`.
- :three: We insert `result.url` inside the column of `img_url`, and the id of the dream inside `dream_id`, into the table **mympyImages**.

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| POST   | `/`                     | All Users           | Posts a new image into the database.               |


### Email route:

#### **`/mail`**

#### Notes:

- :one: A post request to `/mail` passes in the `user_id` and `dream_id.`
- :two: The route takes the ids and grabs the user's email and puts it in the sender/receiver field of the email.
- :three: The receiver (owner of the dream) gets this email in their inbox:

        'Another Mympy User Wants to Connect With You'

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| POST   | `/`                     | All Users           | Sends an email to the dream's owner saying they want to contact them.               |


## :four: Schemas & Server GET Responses:

**SCHEMA** Refers to what you need to post in order for the server to store it. 

**RESPONSE** Refer to what the server responds with after a get request.

### Dreams:

#### Schema:

    {
        id: INTEGER (PK++),
        dream_name: VARCHAR 128,
        dream_short_description: TEXT,
        dream_long_description: TEXT,
        donation_goal: INT,
        donations_received: INTEGER 128,
        user_id: INT (FK)
    }

#### Response (for all dreams):

    {
        "id": INTEGER (PK++),
        "dream_name": "STRING",
        "dream_short_description": "TEXT",
        "donation_goal": INTEGER,
        "donations_received": INTEGER,
        "username": "STRING",
        "img_url": "http://res.cloudinary.com/mympy-cloud/image/upload/v1566320523/k6ahvssosavbcxkfkqbx.png"
    }

#### Response (For an individual dream):

**Note: \n is sent by the frontend to indicate line breaks. This is automatically inserted by the forms when users press enter.**

    {
        "id": 12,
        "dream_name": "Project Ozone",
        "dream_short_description": "A VR project that simulates the destruction of our planet in the wake of our current events.",
        "dream_long_description": "Our Ozone layer is depleting at an alarming rate. Our Amazon forests are burning, destroying the complex ecosystems that rely on the forests, and in turn, causing the extinction of species that are already endangered.\n\nBut what does this all mean for the human race? We can state all these facts, but how does this all affect us?\n\nThe Amazon Forests produces at least 20% of the world's oxygen supply by converting carbon dioxide into oxygen. The Ozone layer maintains it's structure through the use of oxygen, but is depleted by gases like carbon dioxide. The ozone layer shields at least 90% of the UV rays from the sun. Ultra violet rays causes mutation in cells, which causes cancer and the destruction of all lifeforms, including humans.\n\nCurrently, society does not place a huge importance on the effects of human pollution, deforestation, and industrialization, mostly because they are ignorant on the effects it has on us and our future generations. \n\nProject Ozone aims to inform people on the effects of the recent events that affected our planet, and to emphasize how the Ozone affects all lifeforms. \n\nWe aim to create vivid, life-life imagery that not only illuminate people on the consequences of our actions, but to spur calls of actions, so that we can take steps to change our world.\n\nJoin us in the fight to save our world--help us save our planet, and in turn, the generations to come.",
        "donations_received": 0,
        "donation_goal": 130000,
        "user_id": 25,
        "dream_pic": [
            {
                "id": 2,
                "img_url": "http://res.cloudinary.com/mympy-cloud/image/upload/v1566614205/stvphry8t7j0tp7qi3no.jpg",
                "dream_id": 12
            }
        ]
    }

### Cloudinary

Company Website: https://www.cloudinary.com/	

Cloudinary is a service that allows users to store and retrieve images for use on websites. Our application uses a back-end implementation of cloudinary whereby the image is uploaded to cloudinary and the subsequent URL that is served up by the service is stored in a database along with the project id with which it is associated. On the front-end, the URL for the image is retrieved from the database and used as background image for each project using string interpolation. 

`/api/images` is the endpoint that accesses the 'mympyImages' table which returns data in the following shape:

    {
      "id": INTEGER(PK++),
      "img_url": "STRING",
      "dream_id": INTEGER(FK)
    }

### Users:

#### Schema:

    {
      id: INTEGER (PK++),
      username: VARCHAR 128,
      password: VARCHAR 128,
      email: VARCHAR 128
    }

#### Response (All users):

    {
        "id": 1,
        "auth_id": "google-auth0|900000000001",
        "username": "admin",
        "password": "$2a$10$C0axIaTF5x94kEslxGrCzuxUvTf6nWd6l1DLT3DXkbgvvQzAzZfIm",
        "email": "raj@example.com",
        "created_at": "2019-08-20T03:04:15.471Z"
    }

#### Response (individual user):

    {
        "id": 25,
        "auth_id": "google-oauth2|116342319709597535921",
        "username": "lundimal",
        "password": null,
        "email": "lundimal@gmail.com",
        "created_at": "2019-08-20T17:00:46.028Z",
        "dreams": [
            {
                "id": 11,
                "dream_name": "I AM THE BEST",
                "dream_short_description": "sentence one",
                "dream_long_description": "long",
                "donation_goal": 4000,
                "donations_received": 0,
                "img_url": "http://res.cloudinary.com/mympy-cloud/image/upload/v1566320523/k6ahvssosavbcxkfkqbx.png"
            },
            {
                "id": 12,
                "dream_name": "Project Ozone",
                "dream_short_description": "A VR project that simulates the destruction of our planet in the wake of our current events.",
                "dream_long_description": "Text",
                "donation_goal": 130000,
                "donations_received": 0,
                "img_url": "http://res.cloudinary.com/mympy-cloud/image/upload/v1566614205/stvphry8t7j0tp7qi3no.jpg"
            }
        ],
        "userInfo": []
    }

#### Response `/api/users/:id/dreams`

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

### User Info:

#### SCHEMA: 

**Notes: Not Implemented until next product cycle as of 8/28/19.**

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

### Journals

#### Schema:
```
 {
        "id": 16,
        "title": "Journal Entry UPDATED 2",
        "body": "Journal Body",
        "user_id": 25,
        "dream_id": 11
}
```
#### Response:
```
{
    "id": 16,
    "created_at": "2019-08-20T18:40:52.552Z",
    "updated_at": "2019-08-20T20:04:41.342Z",
    "title": "Journal Entry UPDATED 2",
    "body": "Journal Body",
    "user_id": 25,
    "dream_id": 11
}
```


## :five: About Auth0

-Helps to implement authentication with multiple identity providers, including social (e.g., Google, Facebook, Microsoft, LinkedIn, GitHub, Twitter, etc), or enterprise (e.g., Windows Azure AD, Google Apps, Active Directory, ADFS, SAML, etc.)

-log in users with username/password databases, passwordless, or multi-factor authentication
link multiple user accounts together

Helps to generate signed JSON Web Tokens to authorize your API calls and flow the user identity securely

Helps to access demographics and analytics detailing how, when, and where users are logging in
enrich user profiles from other data sources using customizable JavaScript rules

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


### 1 - Login
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



### 2 - Calling an API
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



## :six: Custom Middleware

#### Notes:

The routers have descriptive variables. The router functions will not be explained since it's self-explanitory.

### Dreams:

#### validateDreamBody():

- checks if you Have all the inputs needed to submit to the dreams table.

#### validateDreamId(id)

- checks if the dream_id is valid.


### Users:

#### validateUserBody()

- checks if you have all the inputs needed to submit to the users table.

#### validateUserId(id)

- checks if the user id is valid.

### Journals:

#### validateJournalBody(id)

- checks if you Have all the inputs needed to submit to the journals table.

#### findUser(id)

- Checks if user_id is valid.

#### findDream(id)

- checks if the dream_id is valid

#### validateJournalId(id)

- checks if the journal id is valid.





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


