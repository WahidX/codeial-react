import { combineReducers } from 'redux';
import posts from './posts';
import user from './user';
import snackbar from './snackbar';
import search from './search';
import chats from './chats';

export default combineReducers({
  user,
  posts,
  chats,
  snackbar,
  search,
});
