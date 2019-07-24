const db = require('../data/dbConfig.js');
const bcrypt = require('bcryptjs');

const { update, remove, register } = require('./users-model');

describe('users model', () => {
    beforeEach(async () => {
        await db('user').truncate();
      });
    describe('put request, update()', async () => {
        it('should return updated content with changes', async () => {

            await register({ username: 'thisisnotpatrick', password: bcrypt.hashSync('1', 10), email: 'thisispat@gmail.com' });
            await update(1, { username: 'thisispatrick', password: bcrypt.hashSync('5', 10), email: 'thisispatrick@gmail.com' });

            const user = await findById(1);

            expect(user.username).toBe('Bloodborne');
            expect(user.password).toBe('ACTION RPG');
            expect(user.email).toBe(2015);
        });
    });
    describe('delete request, remove()', async () => {
        it('should delete the user', async () => {
           //add, length 3
            await add({ username: 'BloodBorne', password: 'ACTION RPG', email: 2015 });
            await add({ username: 'Borderlands', password: 'FPS/RPG', email: 2009 });
            await add({ username: 'ARK: Survival Evolved', password: 'SURVIVAL RPG', email: 2017 });

            //delete
            await remove(2);

            //grab
            const users = await find();
            
            //assert
            expect(users).toHaveLength(2);
        });
    });
});