import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minWidth: 250,
    maxWidth: 360,
    backgroundColor: 'cornflowerblue',
    borderRadius: '3%',
    boxShadow: '0px 0px 10px 0px cornflowerblue',
  },
}));

function FriendList(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    let friends = props.friends.friends;
    setChecked(newChecked);
  };

  let { friends } = props.friends;

  return (
    <div className="friendlist-container">
      <p>Following</p>

      {friends.length === 0 ? (
        <small>Follow some coders</small>
      ) : (
        <List dense className={classes.root}>
          {friends.map((friend) => {
            const labelId = `label-${friend._id}`;
            return (
              <Link to={'/profile/' + friend._id}>
                <ListItem key={friend._id} button>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${friend._id}`}
                      src={`/static/images/avatar/${friend._id}.jpg`}
                    />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={friend.name} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(friend._id)}
                      checked={checked.indexOf(friend._id) !== -1}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemSecondaryAction>
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
    friends: state.friends,
  };
}

export default connect(mapStateToProps)(FriendList);
