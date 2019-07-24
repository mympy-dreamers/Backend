const db = require('../../data/dbConfig.js');

const { getDreamById, addDream } = require('./dreams-model.js');
const { login, add } = require('../users/users-model')


describe('dreams model', () => {
    beforeEach(async () => {
        await db('dreams').truncate();
        await db('user').truncate();
    });

    it('should set testing env variable', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('addDream()', () => {
        it('should add a dream to the dreams db', async () => {

            await add({
                "username": "test",
                "password": "test",
                "email": "test@test.com"
            })

            await login({
                "username": "test",
                "password": "test"
            })

            await addDream({
                "dream_name": "test_dream",
                "dream_short_description": "test test. test test test test test test test test test!",
                "dream_long_description": "test test. test test test test test test test test test! test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!",
                "donations_received": 1,
                "dreampic": "test_string",
                "user_id": 4
            })

            const dreams = await db('dreams')

            expect(dreams).toHaveLength(1);
        })
    })

    describe('getDreamById()', () => {
        it('should return one dream when a dream is added and retrieved using getDreamById()', async () => {
            await add({
                "username": "test",
                "password": "test",
                "email": "test@test.com"
            })

            await login({
                "username": "test",
                "password": "test"
            })

            await addDream({
                "dream_name": "test_dream",
                "dream_short_description": "test test. test test test test test test test test test!",
                "dream_long_description": "test test. test test test test test test test test test! test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!",
                "donations_received": 1,
                "dreampic": "test_string",
                "user_id": 4
            })

            const dreamById = await getDreamById(1) // will this work

            expect(dreamById).toHaveLength(1)
        })
    })

})