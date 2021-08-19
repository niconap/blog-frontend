import React from 'react';
import Articles from './Articles';

function Home() {
  return (
    <div>
      <div id="info">
        <h1>Welcome to my blog!</h1>
        <p>
          On this blog you can find articles about all sorts of subjects! Enjoy
          reading! :)
        </p>
        <div id="circle"></div>
        <div id="square"></div>
      </div>
      <Articles />
    </div>
  );
}

export default Home;
