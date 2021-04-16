const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');
const PostGram = require('../lib/models/PostGram');
const Comment = require('../lib/models/Comment');

jest.mock('../lib/middleware/ensureAuth.js', () => (req, res, next) => {
  req.user = {
    username: 'Bob',
    photoURL: 'fakephoto',
  };
  next();
})


describe('. routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  beforeEach(async () => {
    await User.insert({ username: 'Bob', photoURL: 'fakephoto' })
  });

  it('posts a postgram to table', () => {
    return request(app)
      .post('/api/v1/posts')
      .send({
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
          tags: ['fake', 'news']
        })
      })
  })

  it('gets all posts', async () => {
    await PostGram.insert({
      username: 'Bob',
      photoURL: 'fakephoto',
      caption: 'Its a fake photo',
      tags: `{ fake, news }`,
    });
    return request(app)
      .get('/api/v1/posts')
      .then((res) => {
        expect(res.body).toEqual([{
          postgram_id: 1,
          username: 'Bob',
          photoURL: 'fakephoto',
          caption: 'Its a fake photo',
          tags: ['fake', 'news']
        }])
      })
  })

  it('gets post by id', async () => {
    await PostGram.insert({
      username: 'Bob',
      photoURL: 'fakephoto',
      caption: 'Its a fake photo',
      tags: `{ fake, news }`,
    });
    await Comment.insert({
      post: 1,
      comment: 'it is a comment!',
      comment_by: 'Bob'
    })
    await Comment.insert({
      post: 1,
      comment: 'it is a second comment!',
      comment_by: 'Bob'
    })
    return request(app)
      .get('/api/v1/posts/1')
      .then((res) => {
        expect(res.body).toEqual([{
          postgram_id: 1,
          username: 'Bob',
          comment: 'it is a comment!',
          comment_by: 'Bob'
        },{
          postgram_id: 1,
          username: 'Bob',
          comment: 'it is a second comment!',
          comment_by: 'Bob'
        }])
      })
  })

  it('changes the caption on a postgram in table', async () => {
    await PostGram.insert({
      username: 'Bob',
      photoURL: 'fakephoto',
      caption: 'Its a fake photo',
      tags: `{ fake, news }`,
    });
    return request(app)
      .patch('/api/v1/posts/1')
      .send({
        caption: 'Its a still a fake photo',
      })
      .then((res) => {
        expect(res.body).toEqual({
          postgram_id: 1,
          username: 'Bob',
          photoURL: 'fakephoto',
          caption: 'Its a still a fake photo',
          tags: ['fake', 'news']
        })
      })
  })


  it('deletes a post', async () => {
    await PostGram.insert({
      username: 'Bob',
      photoURL: 'fakephoto',
      caption: 'Its a fake photo',
      tags: `{ fake, news }`,
    });
    return request(app)
      .delete('/api/v1/posts/1')
      .then((res) => {
        expect(res.body).toEqual({
          postgram_id: 1,
          username: 'Bob',
          photoURL: 'fakephoto',
          caption: 'Its a fake photo',
          tags: ['fake', 'news']
        })
      })
  })

  // COMMENTS TESTS
  it('gets adds a comment to a post', async () => {
    await PostGram.insert({
      username: 'Bob',
      photoURL: 'fakephoto',
      caption: 'Its a fake photo',
      tags: `{ fake, news }`,
    });
    return request(app)
      .post('/api/v1/comment')
      .send({
        post: 1,
        comment: 'it is a comment!'
      })
      .then((res) => {
        expect(res.body).toEqual({
          post: 1,
          comment: 'it is a comment!',
          comment_by: 'Bob'
        })
      })
  })

  it('deletes a comment', async () => {
    await PostGram.insert({
      username: 'Bob',
      photoURL: 'fakephoto',
      caption: 'Its a fake photo',
      tags: `{ fake, news }`,
    });

    await Comment.insert({
      post: 1,
      comment: 'it is a comment!',
      comment_by: 'Bob'
    })
    return request(app)
      .delete('/api/v1/comment/1')
      .then((res) => {
        expect(res.body).toEqual({
          post: 1,
          comment: 'it is a comment!',
          comment_by: 'Bob'
        })
      })
  })

});
