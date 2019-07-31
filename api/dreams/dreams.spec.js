const db = require('../../data/dbConfig.js');
const usersDB = require('../users/users-model');
const bcrypt = require('bcryptjs');

const { getDreamById, getDreams, addDream, updateDream, removeDream } = require('./dreams-model.js');

describe('dreams model', () => {
    beforeAll(async () => {
        await db.seed.run()
    })
    beforeEach(async () => {
        await db.raw("TRUNCATE TABLE dreams RESTART IDENTITY CASCADE"); // we use the .raw command here because postgres won't truncate the data without it
    });
    it('should set testing env variable', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('addDream()', () => {
        it('should add a dream to the dreams db', async () => {

            await addDream({
                "dream_name": "test_dream",
                "dream_short_description": "test test. test test test test test test test test test!",
                "dream_long_description": "test test. test test test test test test test test test! test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!",
                "donations_received": 1,
                "donation_goal": 100,
                "dreampic": "test_string",
                "user_id": 1
            })

            const dreams = await db('dreams')

            expect(dreams).toHaveLength(1);
        })

        it('should be able to add multiple dreams for a single user to the dreams db', async () => {

            await addDream({
                "dream_name": "test_dream",
                "dream_short_description": "test test. test test test test test test test test test!",
                "dream_long_description": "test test. test test test test test test test test test! test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!",
                "donations_received": 1,
                "donation_goal": 100,
                "dreampic": "test_string",
                "user_id": 1
            })

            await addDream({
                "dream_name": "test_dream2",
                "dream_short_description": "test test. test test test test test test test test test!",
                "dream_long_description": "test test. test test test test test test test test test! test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!",
                "donations_received": 1,
                "donation_goal": 100,
                "dreampic": "test_string",
                "user_id": 1
            })

            await addDream({
                "dream_name": "test_dream3",
                "dream_short_description": "test test. test test test test test test test test test!",
                "dream_long_description": "test test. test test test test test test test test test! test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!",
                "donations_received": 1,
                "donation_goal": 100,
                "dreampic": "test_string",
                "user_id": 1
            })

            const dreams = await db('dreams')

            expect(dreams).toHaveLength(3);
        })

        it('should be able to add a dream for multiple dreams to the dreams db', async () => {

            await addDream({
                "dream_name": "test_dream",
                "dream_short_description": "test test. test test test test test test test test test!",
                "dream_long_description": "test test. test test test test test test test test test! test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!",
                "donations_received": 1,
                "donation_goal": 100,
                "dreampic": "test_string",
                "user_id": 1
            })

            await addDream({
                "dream_name": "test_dream2",
                "dream_short_description": "test test. test test test test test test test test test!",
                "dream_long_description": "test test. test test test test test test test test test! test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!",
                "donations_received": 1,
                "donation_goal": 100,
                "dreampic": "test_string",
                "user_id": 2
            })

            await addDream({
                "dream_name": "test_dream3",
                "dream_short_description": "test test. test test test test test test test test test!",
                "dream_long_description": "test test. test test test test test test test test test! test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!",
                "donations_received": 1,
                "donation_goal": 100,
                "dreampic": "test_string",
                "user_id": 3
            })

            const dreams = await db('dreams')

            expect(dreams).toHaveLength(3);
        })
    })

    describe('getDreams()', () => {
        it('should return all dreams in dreams db', async () => {
            await addDream({
                "dream_name": "test_dream",
                "dream_short_description": "test test. test test test test test test test test test!",
                "dream_long_description": "test test. test test test test test test test test test! test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!",
                "donations_received": 1,
                "donation_goal": 100,
                "dreampic": "test_string",
                "user_id": 1
            })

            await addDream({
                "dream_name": "test_dream2",
                "dream_short_description": "test test. test test test test test test test test test!",
                "dream_long_description": "test test. test test test test test test test test test! test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!",
                "donations_received": 1,
                "donation_goal": 100,
                "dreampic": "test_string",
                "user_id": 1
            })

            await addDream({
                "dream_name": "test_dream3",
                "dream_short_description": "test test. test test test test test test test test test!",
                "dream_long_description": "test test. test test test test test test test test test! test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!",
                "donations_received": 1,
                "donation_goal": 100,
                "dreampic": "test_string",
                "user_id": 1
            })

            const dreams = await getDreams(); // tests regardless of id of dream

            expect(dreams).toHaveLength(3)
        })
    })

    describe('getDreamById()', () => {
        it('should return a dream when a dream is added and retrieved using getDreamById()', async () => {

            const [newDream] = await addDream({ // putting brackets around newDream tells us the id of that new dream
                "dream_name": "test_dream",
                "dream_short_description": "test test. test test test test test test test test test!",
                "dream_long_description": "test test. test test test test test test test test test! test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!",
                "donation_goal": 100,
                "donations_received": 1,
                "dreampic": "test_string",
                "user_id": 1
            })

            console.log("newdream", newDream); // gives us an easy way to see id of new dream being created. As the db truncates before every test, "newdream" should always be 1 in the console.log

            const dreamById = await getDreamById(1) // tests regardless of id of dream

            expect(dreamById).toBeTruthy()
        })
    })
    describe('put request, updateDream()', async () => {
        it('should return updated content with changes', async () => {

            await addDream({ 
                "dream_name": "test_dream",
                "dream_short_description": "test test. test test test test test test test test test!",
                "dream_long_description": "test test. test test test test test test test test test! test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!",
                "donation_goal": 100,
                "donations_received": 1,
                "dreampic": "test_string",
                "user_id": 1
            });
            await updateDream(1, { dream_name: 'PAAAATRICK' });

            const dream = await getDreamById(1);

            expect(dream.dream_name).toBe('PAAAATRICK');
        });
    });
    describe('delete request, removeDream()', async () => {
        it('should delete the dream', async () => {
            await addDream({
                "dream_name": "test_dream",
                "dream_short_description": "test test. test test test test test test test test test!",
                "dream_long_description": "test test. test test test test test test test test test! test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!",
                "donations_received": 1,
                "donation_goal": 100,
                "dreampic": "test_string",
                "user_id": 1
            })

            await addDream({
                "dream_name": "test_dream2",
                "dream_short_description": "test test. test test test test test test test test test!",
                "dream_long_description": "test test. test test test test test test test test test! test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!",
                "donations_received": 1,
                "donation_goal": 100,
                "dreampic": "test_string",
                "user_id": 1
            })

            await addDream({
                "dream_name": "test_dream3",
                "dream_short_description": "test test. test test test test test test test test test!",
                "dream_long_description": "test test. test test test test test test test test test! test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!test test. test test test test test test test test test!",
                "donations_received": 1,
                "donation_goal": 100,
                "dreampic": "test_string",
                "user_id": 1
            })

            await removeDream(2);

            const dreams = await getDreams();
            
            expect(dreams).toHaveLength(2);
        });
    });
});
