const supertest = require('supertest');
const router = require('./users-router');

describe('users router', () => {   
    
    describe('PUT request to /:id', () => {
        it('should respond with 200 with updated changes', () => {
            const data = { email: 'thisispatrick@gmail.com' }
            supertest(router)
                .put('/7')
                .send(data)
                .expect(200)
                .expect('Content-Type', /json/i);
        });
        it('should respond with 404 not found with non-existent id', () => {
            supertest(router)
                .put('/30')
                .expect(404)
                .expect('Content-Type', /json/i);
        });
    });
    describe('DELETE request to /:id', () => {
        it('should respond with 204 no content on success', () => {
            supertest(router)
                .delete('/5')
                .expect(204)
        });
        it('should respond with 404 not found with non-existent id', () => {
            supertest(router)
                .delete('/30')
                .expect(404)
        });
    });
});