import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';

let shape;
let num = Math.floor(Math.random() * 2) + 1;
if (num === 1) {
  shape = 'titlecircle';
} else {
  shape = 'titlesquare';
}

function ArticleDetail() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch('http://188.166.48.194/blog/posts/' + id, {
      mode: 'cors',
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => {
        let { post } = result;
        setTitle(post.title);
        setAuthor(`${post.author.firstname} ${post.author.lastname}`);
        setTimestamp(
          DateTime.fromISO(post.timestamp).toLocaleString({
            day: 'numeric',
            month: 'long',
            hour: 'numeric',
            hour12: false,
            minute: 'numeric',
          })
        );
        setContent(post.content);
        setIsLoaded(true);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
        setIsLoaded(true);
      });
    fetch(`http://188.166.48.194/blog/posts/${id}/comments`, {
      mode: 'cors',
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => {
        setComments(result);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }, [id]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleCommentContentChange(e) {
    setCommentContent(e.target.value);
  }

  function submitComment(e) {
    e.preventDefault();
    fetch(`http://188.166.48.194/blog/posts/${id}/comments`, {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        content: commentContent,
      }),
    });
    window.location.reload(false);
  }

  if (error) {
    return (
      <div id="error">
        <h1>An error occured!</h1>
        <p>Try reloading the page.</p>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div id="loading">
        <h1>Loading content...</h1>
      </div>
    );
  } else {
    return (
      <div id="container">
        <div id="content">
          <h1>{title}</h1>
          <div id={shape}></div>
          <h2>{author}</h2>
          <h4>Posted on {timestamp}</h4>
          <p id="articletext">{content}</p>
        </div>
        <div id="commentform">
          <form onSubmit={submitComment} action="">
            <input
              type="text"
              name="name"
              placeholder="Name..."
              required="true"
              value={name}
              onChange={handleNameChange}
            />
            <input
              type="text"
              name="content"
              placeholder="Comment..."
              required="true"
              value={commentContent}
              onChange={handleCommentContentChange}
            />
            <button>Post</button>
          </form>
        </div>
        <div id="comments">
          {comments.map((comment) => {
            return (
              <div key={comment._id} className="comment">
                <h4>{comment.name}</h4>
                <p>{comment.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ArticleDetail;
