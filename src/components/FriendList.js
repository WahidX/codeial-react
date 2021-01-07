import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minWidth: 200,
    maxWidth: 360,
    borderRadius: '3%',
    boxShadow: '0px 0px 10px 0px cornflowerblue',
  },
}));

function FriendList(props) {
  const classes = useStyles();

  if (!props.user.isLoggedin) {
    return null;
  }
  let friends = props.user.user.friends ? props.user.user.friends : [];

  console.log('fr: ', friends);

  return (
    <div className="friendlist-container">
      <p>Following</p>

      {friends.length === 0 ? (
        <small>Follow some coders</small>
      ) : (
        <List dense className={classes.root}>
          {friends.map((friend) => {
            const labelId = `${friend._id}`;
            return (
              <Link to={'/profile/' + friend._id} key={friend._id}>
                <ListItem className={classes.items} button>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${friend._id}`}
                      src={`/static/images/avatar/${friend._id}.jpg`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    id={labelId}
                    primary={friend.name}
                    color="primary"
                  />
                  <ListItemSecondaryAction></ListItemSecondaryAction>
                </ListItem>
              </Link>
            );
          })}
        </List>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(FriendList);
