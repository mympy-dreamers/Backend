# Documentation for tests ran on backend

### All tests are created using the ARRANGE, ACT, ASSERT method of testing.

## Users Model:

- Truncates the users table before each test
### Test 1: 
- Tests the environment variable to be `TESTING`
### Test 2: 
- Tests the `add()` function by adding three users and expecting a database request to return an array of 3.
### Test 3: 
- Tests the `get()` function by adding three users and expecting `get()` to return an array of 3.
### Test 4: 
- Tests the `get()` function by returning an empty array when the users tables is truncated.
### Test 5: 
- Tests the `get(id)` function by adding a single user,
- retrieving the user by id,
- then expecting the result to return the user's username.
### Test 6: 
- Tests the `get(id)` function by adding 3 users,
- retrieving the third user by id, 
- and expecting the result to return the user's username.
### Test 7: 
- Tests the `update(id)` function by adding a user, 
- then using `update(id)` to change the username and email, 
- and expecting the username and email to be the changed version.
### Test 8: 
- Tests the `delete(id)` function by adding three users, 
- then using `delete(id)` to remove the second user, 
- and using a get request to expect an array of 2.

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


