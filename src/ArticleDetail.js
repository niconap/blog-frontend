import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';

function ArticleDetail() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [content, setContent] = useState('');
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
  }, [id]);

  if (error) {
    return (
      <div id="error">
        <h1>An error occured!</h1>
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
      <div>
        <h1>{title}</h1>
        <h2>{author}</h2>
        <h4>Posted on {timestamp}</h4>
        <p>{content}</p>
      </div>
    );
  }
}

export default ArticleDetail;
