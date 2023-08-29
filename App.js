import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';
import useStyles from './styles';
import NewsCards from './components/newsCards/NewsCards'
import shroud from './shroud.png'
const alanKey = "67886cfd5db685c3ae009bcd09a32bfe2e956eca572e1d8b807a3e2338fdd0dc/stage";
const App = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [, setIsOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    let alanBtnInstance=alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'instructions') {
          setIsOpen(true);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
      onConnectionStatus: async function (status) {
        if (status === 'authorized') {
          await alanBtnInstance.activate();
          alanBtnInstance.playText(
            'Welcome to the Alan AI News Reader App by Harshita Bhat'
          );
          }
        }
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            
          </div>
        ) : null}
        <img src={shroud} width="1635px" height="450px" alt="logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      {!newsArticles.length ? (
        <div className={classes.footer}>
         
        </div>
      ) : null}
    </div>
  );
};

export default App;