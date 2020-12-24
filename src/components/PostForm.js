import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { addPost } from '../actions/posts';

function PostForm(props) {
  const [post, setPost] = useState('');
  let posting = props.posting;

  function postOnChangeHandle(e) {
    setPost(e.target.value);
  }

  function newPostSubmitHandle(e) {
    let postContent = post.trim();
    if (postContent.length !== 0) {
      console.log('Post: ', postContent);
      props.dispatch(addPost(postContent));
      setPost('');
    }
  }

  if (!props.user.isLoggedin) {
    return null;
  }

  return (
    <div className="create-post">
      <textarea
        type="text"
        rows="3"
        value={post}
        placeholder="How you doin?"
        onChange={postOnChangeHandle}
      />

      <Button
        disabled={posting}
        color="primary"
        id="add-post-btn"
        onClick={newPostSubmitHandle}
      >
        Post
      </Button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    posting: state.posts.posting,
    user: state.user,
  };
}

export default connect(mapStateToProps)(PostForm);
