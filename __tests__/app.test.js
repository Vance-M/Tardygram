const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');
describe('. routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  beforeEach(async () => {
    await User.insert({ username: 'Bob', photoURL: 'fakephoto' })
  })


  it('posts a postgram to table', () => {
    return request(app)
      .post('/api/v1/post')
      .send({
        username: 'Bob',
        photoURL: 'fakephoto',
        caption: 'Its a fake photo',
        tags: `{ fake, news }`,
      })
      .then((res) => {
        expect(res.body).toEqual({
          postgram_id: 1,
          username: 'Bob',
          photoURL: 'fakephoto',
          caption: 'Its a fake photo',
          tags: [ 'fake', 'news' ]
        })
      })
  })


});
