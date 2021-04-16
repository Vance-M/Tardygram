const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');
const PostGram = require('../lib/models/PostGram');

jest.mock('../lib/middleware/ensureAuth.js', () => (req, res, next) => {
    req.user = {
        username: 'Bob',
        photoURL: 'fakephoto',
    };
    next();
})

describe('bonus routes', () => {
    beforeEach(() => {
        return setup(pool);
    });


    it('gets most prolific user', async () => {
        await User.insert({ username: 'One', photoURL: 'fakephoto' })
        await User.insert({ username: 'Two', photoURL: 'fakephoto' })
        await User.insert({ username: 'Three', photoURL: 'fakephoto' })
        await User.insert({ username: 'Four', photoURL: 'fakephoto' })
        await User.insert({ username: 'Five', photoURL: 'fakephoto' })
        await User.insert({ username: 'Six', photoURL: 'fakephoto' })
        await User.insert({ username: 'Seven', photoURL: 'fakephoto' })
        await User.insert({ username: 'Eight', photoURL: 'fakephoto' })
        await User.insert({ username: 'Nine', photoURL: 'fakephoto' })
        await User.insert({ username: 'Ten', photoURL: 'fakephoto' })
        await User.insert({ username: 'Eleven', photoURL: 'fakephoto' })
        await PostGram.insert({
            username: 'Eleven',
            photoURL: 'fakephoto',
            caption: 'Its a fake photo',
            tags: `{ fake, news }`,
        });
        await PostGram.insert({
            username: 'Eleven',
            photoURL: 'fakephoto',
            caption: 'Its another fake photo',
            tags: `{ fake, news }`,
        });
        await PostGram.insert({
            username: 'One',
            photoURL: 'fakephoto',
            caption: 'Its my fake photo',
            tags: `{ fake, news }`,
        });
        await PostGram.insert({
            username: 'Two',
            photoURL: 'fakephoto',
            caption: 'Its my fake photo',
            tags: `{ fake, news }`,
        });
        await PostGram.insert({
            username: 'Three',
            photoURL: 'fakephoto',
            caption: 'Its my fake photo',
            tags: `{ fake, news }`,
        });
        await PostGram.insert({
            username: 'Four',
            photoURL: 'fakephoto',
            caption: 'Its my fake photo',
            tags: `{ fake, news }`,
        });
        await PostGram.insert({
            username: 'Five',
            photoURL: 'fakephoto',
            caption: 'Its my fake photo',
            tags: `{ fake, news }`,
        });
        await PostGram.insert({
            username: 'Six',
            photoURL: 'fakephoto',
            caption: 'Its my fake photo',
            tags: `{ fake, news }`,
        });
        await PostGram.insert({
            username: 'Seven',
            photoURL: 'fakephoto',
            caption: 'Its my fake photo',
            tags: `{ fake, news }`,
        });
        await PostGram.insert({
            username: 'Eight',
            photoURL: 'fakephoto',
            caption: 'Its my fake photo',
            tags: `{ fake, news }`,
        });
        await PostGram.insert({
            username: 'Nine',
            photoURL: 'fakephoto',
            caption: 'Its my fake photo',
            tags: `{ fake, news }`,
        });

        return request(app)
            .get('/api/v1/users/prolific')
            .then((res) => {
                expect(res.body).toEqual([
                    { username: 'Eleven' },
                    { username: 'Eight' },
                    { username: 'Five' },
                    { username: 'Four' },
                    { username: 'Nine' },
                    { username: 'One' },
                    { username: 'Seven' },
                    { username: 'Six' },
                    { username: 'Three' },
                    { username: 'Two' }
                ])
            })
    })

});

