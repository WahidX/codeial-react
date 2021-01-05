import { combineReducers } from 'redux';
import posts from './posts';
import user from './user';
import friends from './friends';
import snackbar from './snackbar';
import search from './search';

export default combineReducers({
  user,
  posts,
  friends,
  snackbar,
  search,
});
