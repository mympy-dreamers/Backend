const db = require('../../data/dbConfig');
const bcrypt = require('bcryptjs');

const { update, remove, add, get } = require('./users-model');

describe('users model', () => {
    beforeEach(async () => {
        await db.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
    });

    it('should set testing env variable', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
    describe('post request, add()', () => {
        it('should add the provided users', async () => {
            await add({ username: 'mick', password: bcrypt.hashSync('1', 10), email: 'mickissick@gmail.com' });
            await add({ username: 'sick', password: bcrypt.hashSync('1', 10), email: 'butsickismick@gmail.com' });
            await add({ username: 'bick', password: bcrypt.hashSync('1', 10), email: 'andsickaintbick@gmail.com' });

            const users = await db('users');

            expect(users).toHaveLength(3);
        });
    });
    describe('get request, get()', async () => {
        it('should return all users', async () => {
        
            await add({ username: 'mick', password: bcrypt.hashSync('1', 10), email: 'mickissick@gmail.com' });
            await add({ username: 'sick', password: bcrypt.hashSync('1', 10), email: 'butsickismick@gmail.com' });
            await add({ username: 'bick', password: bcrypt.hashSync('1', 10), email: 'andsickaintbick@gmail.com' });

            const users = await get();
            
            expect(users).toHaveLength(3);
        });
        it('should be an empty array', async () => {
            const users = await db('users');
            
            expect(users).toEqual([]);
        })
    });
    describe('get request, get()', async () => {
        it('should return a user that matches the id', async () => {
            
            await add({ username: 'mick', password: bcrypt.hashSync('1', 10), email: 'mickissick@gmail.com' });
            
            const user = await get(1);
            
            expect(user.username).toBe('mick');
        });

        it('should return a user that matches the id of username', async () => {
        
            await add({ username: 'mick', password: bcrypt.hashSync('1', 10), email: 'mickissick@gmail.com' });
            await add({ username: 'sick', password: bcrypt.hashSync('1', 10), email: 'butsickismick@gmail.com' });
            await add({ username: 'bick', password: bcrypt.hashSync('1', 10), email: 'andsickaintbick@gmail.com' });
            
            const user = await get(3);
            
            expect(user.username).toBe('bick');
        });
    });
    describe('put request, update()', async () => {
        it('should return updated content with changes', async () => {

            await add({ username: 'thisisnotpatrick', password: bcrypt.hashSync('1', 10), email: 'thisispat@gmail.com' });
            await update(1, { username: 'thisispatrick', password: bcrypt.hashSync('5', 10), email: 'thisispatrick@gmail.com' });

            const user = await get(1);

            expect(user.username).toBe('thisispatrick');
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