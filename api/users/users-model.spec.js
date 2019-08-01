const db = require('../../data/dbConfig');
const bcrypt = require('bcryptjs');
const Users = require('./users-model');

describe('users model', () => {
    beforeEach(async () => {
        await db.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
    });
    it('should set testing env variable', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
    describe('get request, get()', async () => {
        it('should return all users', async () => {
        
            await Users.add({ username: 'mick', password: bcrypt.hashSync('1', 10), email: 'mickissick@gmail.com' });
            await Users.add({ username: 'sick', password: bcrypt.hashSync('1', 10), email: 'butsickismick@gmail.com' });
            await Users.add({ username: 'bick', password: bcrypt.hashSync('1', 10), email: 'andsickaintbick@gmail.com' });

            const users = await Users.get();
            
            expect(users).toHaveLength(3);
        });
        it('should be an empty array', async () => {
            const users = await Users.get();
            
            expect(users).toEqual([]);
        });
        it('should return a user with added userInfo and dreams properties', async () => {

            const [id] = await Users.add({ username: 'mick', password: bcrypt.hashSync('1', 10), email: 'mickissick@gmail.com' })

            const user = await Users.get(id)

            expect(user.username).toBe('mick');
            expect(user.dreams).toBeTruthy();
            expect(user.userInfo).toEqual([]);
        });
        it('should return a user that matches the id of username', async () => {
        
            await Users.add({ username: 'mick', password: bcrypt.hashSync('1', 10), email: 'mickissick@gmail.com' });
            await Users.add({ username: 'sick', password: bcrypt.hashSync('1', 10), email: 'butsickismick@gmail.com' });
            await Users.add({ username: 'bick', password: bcrypt.hashSync('1', 10), email: 'andsickaintbick@gmail.com' });
            
            const user = await Users.get(3);
            
            expect(user.username).toBe('bick');
        });
    });
    describe('post request, add()', () => {
        it('should add the provided users', async () => {
            await db.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
            await Users.add({ username: 'mick', password: bcrypt.hashSync('1', 10), email: 'mickissick@gmail.com' });
            await Users.add({ username: 'sick', password: bcrypt.hashSync('1', 10), email: 'butsickismick@gmail.com' });
            await Users.add({ username: 'bick', password: bcrypt.hashSync('1', 10), email: 'andsickaintbick@gmail.com' });

            const users = await db('users');

            expect(users).toHaveLength(3);
        });
    });
    describe('put request, update()', async () => {
        it('should return updated content with changes', async () => {

            await Users.add({ username: 'thisisnotpatrick', password: bcrypt.hashSync('1', 10), email: 'thisispat@gmail.com' });
            await Users.update(1, { username: 'thisispatrick', password: bcrypt.hashSync('5', 10), email: 'thisispatrick@gmail.com' });

            const user = await Users.get(1);

            expect(user.username).toBe('thisispatrick');
            expect(user.email).toBe('thisispatrick@gmail.com');
        });
    });
    describe('delete request, remove()', async () => {
        it('should delete the user', async () => {
            await Users.add({ username: 'mick', password: bcrypt.hashSync('1', 10), email: 'mickissick@gmail.com' });
            await Users.add({ username: 'sick', password: bcrypt.hashSync('1', 10), email: 'butsickismick@gmail.com' });
            await Users.add({ username: 'bick', password: bcrypt.hashSync('1', 10), email: 'andsickaintbick@gmail.com' });

            await Users.remove(2);

            const users = await Users.get();
            
            expect(users).toHaveLength(2);
        });
    });
});