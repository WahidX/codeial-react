// export const SERVER_ROOT = 'https://codeialx.herokuapp.com';
export const SERVER_ROOT = 'http://localhost:8000';
const API_ROOT = `${SERVER_ROOT}/api/v1`;

export const APIurls = {
  // auth
  createSession: () => `${API_ROOT}/auth/create-session`,
  createUser: () => `${API_ROOT}/auth/create-user`,
  changePassword: () => `${API_ROOT}/auth/change-password`,
  googleAuth: () => `${API_ROOT}/auth/google`,
  // user
  fetchUser: () => `${API_ROOT}/users/profile`,
  getUser: (id, type) => `${API_ROOT}/users/get-user/?id=${id}&type=${type}`,
  updateUser: () => `${API_ROOT}/users/update`,

  // posts
  fetchPosts: () => `${API_ROOT}/posts`,
  addPost: () => `${API_ROOT}/posts/create`,
  likeToggle: (id) => `${API_ROOT}/likes/toggle/?id=${id}&type=Post`,
  deletePost: (id) => `${API_ROOT}/posts/${id}`,

  // friend
  fetchFriends: () => `${API_ROOT}/friends/`,
  followToggle: (id) => `${API_ROOT}/friends/add-remove?id=${id}`,

  //searching
  fetchSearchResults: (key, type) =>
    `${API_ROOT}/search/?key=${key}&type=${type}`,

  // socket Endpoint
  getEndPoint: () => 'localhost:5000',
  getChats: () => `${API_ROOT}/chats`,
  getMessages: (id) => `${API_ROOT}/messages/${id}`,
};
