export const SERVER_ROOT = 'https://codeialx.herokuapp.com';
const API_ROOT = `${SERVER_ROOT}/api/v1`;

export const APIurls = {
  createSession: () => `${API_ROOT}/users/create-session`,
  createUser: () => `${API_ROOT}/users/create-user`,
  fetchUser: () => `${API_ROOT}/user/authenticate`,
  fetchPosts: () => `${API_ROOT}/posts`,
  addPost: () => `${API_ROOT}/posts/create`,
};
