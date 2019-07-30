const supertest = require('supertest');
const router = require('./dreams-router');

describe('dreams router', () => {
    describe('GET request to /', () => {
        it('responds with 200 OK', () => {
            supertest(router)
                .get('/')
                .expect(200);
        });
        it('is JSON content', () => {
            supertest(router)
                .get('/')
                .expect('Content-Type', /json/i)
        })
        it('should return a specific object from id', () => {
            supertest(router)
                .get('/1')
                .expect(200)
                .expect('Content-Type', /json/i);
        });
        it('should return status 404 if id does not exist', () => {
            supertest(router)
                .get('/40')
                .expect(404)
                .expect('Content-Type', /json/i);
        });
    });
    describe('POST request to /', () => {
        it('should respond with 201 created', () => {
            const data = {
                "dream_name": "PATRICK",
                "dream_short_description": "test test. test test test test test test test test test!",
                "dream_long_description": "test test. test test test test test test test test test! test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!",
                "donations_received": 1,
                "donation_goal": 100,
                "dreampic": "test_string",
                "user_id": 1
            }

            supertest(router)
                .post('/')
                .send(data)
                .expect(201)
                .expect('Content-Type', /json/i);
        });
        it('should respond with 400 not created', () => {
            const data = {
                "dream_short_description": "test test. test test test test test test test test test!",
                "dream_long_description": "test test. test test test test test test test test test! test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!",
                "donations_received": 1,
                "donation_goal": 100,
                "dreampic": "test_string",
                "user_id": 1
            }
            
            supertest(router)
                .post('/')
                .send(data)
                .expect(400)
                .expect('Content-Type', /json/i);
        });
    });
    describe('PUT request to /:id', () => {
        it('should respond with 200 with updated changes', () => {
            const data = {
                "dream_name": "ARGHHH",
            }
            supertest(router)
                .put('/1')
                .send(data)
                .expect(200)
                .expect('Content-Type', /json/i);
        });
        it('should respond with 404 not found with non-existent id', () => {
            supertest(router)
                .put('/60')
                .expect(404)
                .expect('Content-Type', /json/i);
        });
    });
    describe('DELETE request to /:id', () => {
        it('should respond with 200 on success', () => {
            supertest(router)
                .delete('/2')
                .expect(200)
        });
        it('should respond with 404 not found with non-existent id', () => {
            supertest(router)
                .delete('/70')
                .expect(404)
        });
    });
});