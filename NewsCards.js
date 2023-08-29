import { Grid, Grow, Typography } from '@mui/material'
import React from 'react'
import NewCard from '../newCard/NewCard'
import useStyle from './styles.js'

const infoCards = [
  { color: '#00838f', title: 'Latest News', text: 'Give me the latest news' },
  { color: '#1565c0', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports', text: 'Give me the latest news' },
  { color: '#4527a0', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...', text: 'What\'s up with PlayStation 5' },
  { color: '#283593', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: 'Give me the news from CNN' },
]; 

const NewsCards = ({articles, activeArticle}) => {
  const classes = useStyle();

  if (!articles.length) {
    const mystyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: '45vh',
      padding: '10%',
      borderRadius: 10,
      color: 'white',
      backgroundColor:"black"
    };
    return (
      <Grow in>
        <Grid className={classes.container} container alignItems="stretch" spacing={2}>
          {infoCards.map((infoCard) => (
            <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCard}>
              <div style={mystyle}>
                <Typography variant="h5" component="h5">{infoCard.title}</Typography>
                {infoCard.info ? <Typography variant="h6" component="h6"><strong>{infoCard.title.split(' ')[2]}</strong>: <br />{infoCard.info}</Typography> : null}
                <Typography variant="h6" component="h6">Try saying: <br /> <i>{infoCard.text}</i></Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grow>
    );
  }

  return (
    <Grow in>
        <Grid className={classes.container} container alignItems='stretch' spacing={3}>
        {
            articles.map((article, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} style={{display: 'flex'}}>
                  <NewCard article={article} activeArticle={activeArticle} i={i}/>
                </Grid>
            ))
        }
        </Grid>
    </Grow >
  )
}

export default NewsCards