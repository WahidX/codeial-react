export const SERVER_ROOT = 'https://codeialx.herokuapp.com';
// export const SERVER_ROOT = 'https://localhost:8000';
const API_ROOT = `${SERVER_ROOT}/api/v1`;

export const APIurls = {
  // user
  createSession: () => `${API_ROOT}/users/create-session`,
  createUser: () => `${API_ROOT}/users/create-user`,
  fetchUser: () => `${API_ROOT}/users/profile`,
  updateUser: () => `${API_ROOT}/users/update`,
  changePassword: () => `${API_ROOT}/users/change-password`,

  // posts
  fetchPosts: () => `${API_ROOT}/posts`,
  addPost: () => `${API_ROOT}/posts/create`,
  likeToggle: (id) => `${API_ROOT}/likes/toggle/?id=${id}&type=Post`,
  deletePost: (id) => `${API_ROOT}/posts/${id}`,

  // friend
  fetchFriends: () => `${API_ROOT}/friends/`,
  addRemove: (id) => `${API_ROOT}/friends/add-remove?id=${id}`,

  //searching
  fetchSearchResults: (key, type) =>
    `${API_ROOT}/search/?key=${key}&type=${type}`,
};
