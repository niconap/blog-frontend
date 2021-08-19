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
        <p>Try reloading the page.</p>
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
          let num = Math.floor(Math.random() * 2) + 1;
          if (num === 1) {
            return (
              <li key={article._id}>
                <h3>{article.title}</h3>
                <p>
                  By {article.author.firstname} {article.author.lastname} (
                  {article.author.username})
                </p>
                <Link className="readmore" to={'/article/' + article._id}>
                  Read more...
                </Link>
                <div className="square"></div>
              </li>
            );
          } else {
            return (
              <li key={article._id}>
                <h3>{article.title}</h3>
                <p>
                  By {article.author.firstname} {article.author.lastname} (
                  {article.author.username})
                </p>
                <Link className="readmore" to={'/article/' + article._id}>
                  Read more...
                </Link>
                <div className="circle"></div>
              </li>
            );
          }
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
