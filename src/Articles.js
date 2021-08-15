import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch('http://188.166.48.194/blog/posts', {
      mode: 'cors',
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => {
        setArticles(result);
        setIsLoaded(true);
      })
      .catch((error) => {
        setError(error);
        setIsLoaded(true);
      });
  }, []);

  if (error) {
    return (
      <div>
        <h1>An error occured!</h1>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div>
        <h1>Loading content...</h1>
      </div>
    );
  } else if (articles.length > 0) {
    return (
      <div id="articles">
        {articles.map((article) => {
          return (
            <li key={article._id}>
              <Link to={'/article/' + article._id}>
                <h3>{article.title}</h3>
              </Link>
              <p>
                By {article.author.firstname} {article.author.lastname} (
                {article.author.username})
              </p>
            </li>
          );
        })}
      </div>
    );
  } else {
    return (
      <div id="message">
        <p>Currently there are no articles.</p>
      </div>
    );
  }
}

export default Articles;
