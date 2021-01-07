import { combineReducers } from 'redux';
import posts from './posts';
import user from './user';
import snackbar from './snackbar';
import search from './search';

export default combineReducers({
  user,
  posts,
  snackbar,
  search,
});
