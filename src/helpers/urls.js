export const SERVER_ROOT = 'https://codeialx.herokuapp.com';
const API_ROOT = `${SERVER_ROOT}/api/v1`;

export const APIurls = {
  createSession: () => `${API_ROOT}/users/create-session`,
  createUser: () => `${API_ROOT}/users/create-user`,
  fetchUser: () => `${API_ROOT}/users/profile`,
  updateUser: () => `${API_ROOT}/users/`,
  fetchPosts: () => `${API_ROOT}/posts`,
  addPost: () => `${API_ROOT}/posts/create`,
  likeToggle: (id) => `${API_ROOT}/likes/toggle/?id=${id}&type=Post`,
  deletePost: (id) => `${API_ROOT}/posts/${id}`,
};
