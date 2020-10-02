/**
 * '/getAll'
 * '/get-by-id/:id'
 * '/get-by-user/:userId'
 * '/new'
 * '/edit/:id'
 * '/delete-by-id/:id'
 * '/delete-by-user/:userId/:id'
 * '/deleteAll-user-posts/:userId'
 */

export const POST_ENDPOINTS = {
  comment: '/api/v1/posts/comment',
  create: '/api/v1/posts/new',
  deleteAllUserPosts: '/api/v1/posts/delete-all-user-posts',
  deleteById: '/api/v1/posts/delete-by-id',
  deleteByUser: '/api/v1/posts/delete-by-user',
  getAll: '/api/v1/posts/getAll',
  getById: '/api/v1/posts/get-by-id',
  getByUserId: '/api/v1/posts/get-by-user',
  like: '/api/v1/posts/like',
  unLike: '/api/v1/posts/unlike',
  update: '/api/v1/posts/edit',
};
