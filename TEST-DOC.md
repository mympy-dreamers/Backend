# Documentation for tests ran on backend

### All tests are created using the ARRANGE, ACT, ASSERT method of testing.

### Coverage: 80%

The following tests covers the existing endpoints for users model, users router (put and delete only), dreams model, and dreams router. There are 30 tests in total. There are 3 unit tests and 1 integration test (dreams model) all have passed successfully as of 7/31/2019.

## Users Model:

- Truncates the users table before each test
### Test 1: `ENV` variable
- Tests the environment variable to be `TESTING`
### Test 2:  `add()`
- Tests the `add()` function by adding three users and expecting a database request to return an array of 3.
### Test 3: `get()`
- Tests the `get()` function by adding three users and expecting `get()` to return an array of 3.
### Test 4: `get()`
- Tests the `get()` function by returning an empty array when the users tables is truncated.
### Test 5: `get(id)`
- Tests the `get(id)` function by adding a single user,
- retrieving the user by id,
- then expecting the result to:
    - return the user's username, 
    - return the dreams property to be truthy
    - return userInfo as an empty array 
### Test 6: `get(id)`
- Tests the `get(id)` function by adding 3 users,
- retrieving the third user by id, 
- and expecting the result to return the user's username.
### Test 7: `update(id)`
- Tests the `update(id)` function by adding a user, 
- then using `update(id)` to change the username and email, 
- and expecting the username and email to be the changed version.
### Test 8: `delete(id)`
- Tests the `delete(id)` function by adding three users, 
- then using `delete(id)` to remove the second user, 
- and using a get request to expect an array of 2.

<br>

## Users Router:
### Test 1: Tests for a successful PUT request to `/:id`. 
- Tests a put request to an existing user id, `7`
- Sends newly changed email information, through const data
- Expects an HTTP response code of 200, OK
- Expects the content type to be .json
### Test 2: Tests for an unsuccessful PUT request to `/:id`.
- Tests a put request to a non-existent user id, `30`
- Expects an HTTP response code of 404, not found
- Expects the content type to be .json
### Test 3: Tests for a successful delete request to `/:id`
- Tests a delete request to an existing user, `5`
- Expects an HTTP response code of 204, no content
### Test 4: Tests for an unsuccessful delete request to `/id`
- Tests a delete request to a non-existent user id, `30`
- Expects an HTTP response code of 404, not found


_______________________________________________________________________________________________________




## Dreams Model:

- Truncates the Dreams table before each test
- Before all tests are run, the seeds for the test DB is run for integration testing.
### Test 1: `ENV` variable
- Tests the environment variable to be `TESTING`
### Test 2: `addDream()`
- Tests the `addDream()` function by adding a single dream
- and expecting a database request to respond with an array of 1.
### Test 3: `addDream()`: multiple dreams for a single user
- Tests the `addDream()` function by adding three dreams for a single user
- and expecting a database request to dreams to respond with an array of 3.
### Test 4: `addDream()`: multple dreams for multiple users
- Tests the `addDream()` function by adding different dreams for different users.
- and expecting a database request to dreams to respond with an array of 3.
### Test 5: `getDreams()`
- Tests the `getDreams()` function by adding three dreams,
- calling `getDreams`
- then expecting the result to return an array of 3 dreams.
### Test 6: `getDreamById(id)`
- Tests the `getDreamById(id)` function by adding a dream,
- retrieving the dream by `getDreamById(1)`, 
- and expecting the result to be truthy.
### Test 7: `updateDream(id)`
- Tests the `update(id)` function by adding a dream, 
- then using `update(id)` to change the `dream_name`, 
- and expecting the `dream_name` to be the changed version.
### Test 8: `removeDream(id)`
- Tests the `removeDream(id)` function by adding three dreams, 
- then using `removeDream(id)` to remove the second dream, 
- and using a get request to expect an array of 2.

<br>

## Dreams Router

### Test 1: Tests for GET requests. 
- Tests a get request to `/`
- Expects an HTTP response code of 200, OK on success
- Expects the content type to be .json
- Expects an HTTP response code of 200, OK on `get(id)`
- Expects previous `get(id)` to be .json
- Expects an HTTP response code of 404 if id doesn't exist.
- Expects previous response to be .json
### Test 2: Tests for POST requests 
- Sends a new dream object with all required fields through const data
- Expects an HTTP response code of 201 created
- Expects the content type to be .json
- Expects an HTTP response code to be 400 with missing fields
- Expects the previous response content type to be .json
### Test 3: Tests for a successful PUT request to `/:id`. 
- Tests a put request to an existing dream id, `1`
- Sends newly changed `dream_name` information, through const data
- Expects an HTTP response code of 200, OK
- Expects the content type to be .json
### Test 4: Tests for an unsuccessful PUT request to `/:id`.
- Tests a put request to a non-existent dream id, `60`
- Expects an HTTP response code of 404, not found
- Expects the content type to be .json
### Test 5: Tests for a successful delete request to `/:id`
- Tests a delete request to an existing dream, `2`
- Expects an HTTP response code of 204, no content
### Test 6: Tests for an unsuccessful delete request to `/id`
- Tests a delete request to a non-existent dream id, `70`
- Expects an HTTP response code of 404, not found


