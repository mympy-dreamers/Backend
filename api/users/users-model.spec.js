const db = require('../../data/dbConfig');
const bcrypt = require('bcryptjs');

const { update, remove, add, findById, get } = require('./users-model');

describe('users model', () => {
    beforeEach(async () => {
        await db.raw("TRUNCATE TABLE dreams RESTART IDENTITY CASCADE");
    });

    it('should set testing env variable', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
    describe('put request, update()', async () => {
        it('should return updated content with changes', async () => {

            await add({ username: 'thisisnotpatrick', password: bcrypt.hashSync('1', 10), email: 'thisispat@gmail.com' });
            await update(1, { username: 'thisispatrick', password: bcrypt.hashSync('5', 10), email: 'thisispatrick@gmail.com' });

            const user = await findById(1);

            expect(user.username).toBe('thisispatrick');
            expect(user.password).toBe(bcrypt.hashSync('5', 10));
            expect(user.email).toBe('thisispatrick@gmail.com');
        });
    });
    describe('delete request, remove()', async () => {
        it('should delete the user', async () => {
            await add({ username: 'mick', password: bcrypt.hashSync('1', 10), email: 'mickissick@gmail.com' });
            await add({ username: 'sick', password: bcrypt.hashSync('1', 10), email: 'butsickismick@gmail.com' });
            await add({ username: 'bick', password: bcrypt.hashSync('1', 10), email: 'andsickaintbick@gmail.com' });

            await remove(2);

            const users = await get();
            
            expect(users).toHaveLength(2);
        });
    });
});