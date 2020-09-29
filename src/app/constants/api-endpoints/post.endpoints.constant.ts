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
  create: '/api/v1/posts/new',
  update: '/api/v1/posts/edit',
  getAll: '/api/v1/posts/getAll',
  like: '/api/v1/posts/like',
  getById: '/api/v1/posts/get-by-id',
  getByUserId: '/api/v1/posts/get-by-user',
  deleteById: '/api/v1/posts/delete-by-id',
  deleteByUser: '/api/v1/posts/delete-by-user',
  deleteAllUserPosts: '/api/v1/posts/delete-all-user-posts',
};
