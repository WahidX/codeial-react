export const SERVER_ROOT = 'https://codeialx.herokuapp.com';
const API_ROOT = `${SERVER_ROOT}/api/v1`;

export const APIurls = {
  // user
  createSession: () => `${API_ROOT}/users/create-session`,
  createUser: () => `${API_ROOT}/users/create-user`,
  fetchUser: () => `${API_ROOT}/users/profile`,
  updateUser: () => `${API_ROOT}/users/`,
  // posts
  fetchPosts: () => `${API_ROOT}/posts`,
  addPost: () => `${API_ROOT}/posts/create`,
  likeToggle: (id) => `${API_ROOT}/likes/toggle/?id=${id}&type=Post`,
  deletePost: (id) => `${API_ROOT}/posts/${id}`,
  // friend
  fetchFriends: () => `${API_ROOT}/friends/`,
  addRemove: (id) => `${API_ROOT}/friends/add-remove?id=${id}`,
};
// http://localhost:8000/api/v1/friends/
// http://localhost:8000/api/v1/friends/add-remove?id=5fe4f1a246c58811201287cb
