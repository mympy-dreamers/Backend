🚫 Note: All lines that start with 🚫 are instructions and should be deleted before this is posted to your portfolio. This is intended to be a guideline. Feel free to add your own flare to it.

🚫 The numbers 1️⃣ through 3️⃣ next to each item represent the week that part of the docs needs to be comepleted by.  Make sure to delete the numbers by the end of Labs.

🚫 Each student has a required minimum number of meaningful PRs each week per the rubric.  Contributing to docs does NOT count as a PR to meet your weekly requirements.

# API Documentation

#### 1️⃣ Backend deployed at [🚫name service here](🚫add URL here) <br>

## 1️⃣ Getting started

To get the server running locally:

🚫 adjust these scripts to match your project

- Clone this repo
- **npm install** to install all required dependencies
- **npm server** to start the local server
- **npm test** to start server using testing environment

### Backend framework goes here

Accessibility and clarity comes with route specifications, therefore it's easier to have the server route to the following:

## 2️⃣ POST Endpoints:

The following are required fields in order to successfully POST to specified urls:

### Dreams:
////a



#### Notes:

`dreampic` requires additional logic and research (cloudinary) to be able to add images to the database.

`${server}/api/dreams`


    {
      id: INTEGER (PK++),
      dream_name: VARCHAR 128,
      dream_short_description: TEXT,
      dream_long_description: TEXT,
      donations_received: INTEGER 128,
      user_id: INT (FK),
      dreampic: VARCHAR
    }

### Users:

`${server}/api/user`

    {
      id: INTEGER (PK++),
      username: VARCHAR 128,
      password: VARCHAR 128,
      email: VARCHAR 128
    }

`${server}/api/user-info`

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

`${server}/api/user`

#### Notes:

The list of user objects will output added properties `userInfo` and `dreams`. Both are connected through the associated tables (by joins, foreign keys, and promise logic).



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


#### Dreams Routes

| Method | Endpoint                | Access Control | Description                          |
| ------ | ----------------------- | -------------- | -------------------------------------|
| GET    | `/`                     | all users      | Returns info for all dream projects. |
| GET    | `/:id`                  | all users      | Returns info for a dream project.    |
| PUT    | `/:id`                  | restricted     | Modify an existing dream project.    |
| DELETE | `/:id`                  | restricted     | Delete a dream.                      |
| POST   | `/`                     | restricted     | Post a new dream project.            |

#### User Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/`                     | restricted          | Returns all users for an dream.             |
| GET    | `/:id          `        | restricted          | Returns info for a single user.                    |
| GET    | `/:id/dreams          ` | restricted          | Dreams belonging to a specific user.               |
| PUT    | `/:id`                  | restricted          | Edit a user's information.                         |
| DELETE | `/:id`                  | restricted          | Delete a user's information.                       |


## 2️⃣ Actions

### Notes:

There will be different logic for both types of get requests (for a single user and for all users) due to adding the `dreams` and `userInfo` properties.

### Dreams:

#### getDreams()

- Returns all dreams

#### getDream(id)

- Returns a single dream by ID

#### addDream(dream)

- Adds the request into the database

#### updateDreams(id, changes)

- Update a dream by ID

#### deleteDreams(id)

- Delete a dream by ID



### Users:

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


## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

🚫 These are just examples, replace them with the specifics for your app
    
    *  STAGING_DB - optional development db for using functionality not available in SQLite
    *  NODE_ENV - set to "development" until ready for "production"
    *  JWT_SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-*=+)') for i in range(50)])
    *  SENDGRID_API_KEY - this is generated in your Sendgrid account
    *  stripe_secret - this is generated in the Stripe dashboard
    
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

See [Frontend Documentation](🚫link to your frontend readme here) for details on the fronend of our project.
🚫 Add DS iOS and/or Andriod links here if applicable.
