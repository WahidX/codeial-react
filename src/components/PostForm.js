import React, { useState } from 'react';

function PostForm(props) {
  const [post, setPost] = useState('');

  function postOnChangeHandle(e) {
    setPost(e.target.value);
  }

  function newPostSubmitHandle(e) {
    let postContent = post.trim();
    if (postContent.length !== 0) {
      console.log('Post: ', postContent);
      setPost('');
    }
  }

  return (
    <div className="postform-container">
      <h1>Add new Post: </h1>
      <textarea
        type="text"
        rows="3"
        value={post}
        onChange={postOnChangeHandle}
      />
      <button onClick={newPostSubmitHandle}>Post</button>
    </div>
  );
}

export default PostForm;
