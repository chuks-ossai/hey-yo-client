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
  create: '/api/v1/post/new',
  update: '/api/v1/post/edit',
  getAll: '/api/v1/post/getAll',
  getById: '/api/v1/post/get-by-id',
  getByUserId: '/api/v1/post/get-by-user',
  deleteById: '/api/v1/post/delete-by-id',
  deleteByUser: '/api/v1/post/delete-by-user',
  deleteAllUserPosts: '/api/v1/post/delete-all-user-posts',
};
