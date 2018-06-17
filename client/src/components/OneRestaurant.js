import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Clear from '@material-ui/icons/Clear'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    margin: 0
  },
  media: {
    minHeight: '75vh',
    minWidth: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '15px'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '0'
  },
  text: {
    lineHeight: 'inherit',
    color: 'white'
  }
}

const OneRestaurant = props => {
  const { classes, restaurant, handleLike, handleDislike } = props
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={restaurant.photos[0]}
          title={restaurant.name}
        >
          <Typography
            variant="headline"
            component="h3"
            className={classes.text}
          >
            {`${restaurant.name}, ${restaurant.price}`}
          </Typography>
        </CardMedia>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            aria-label="Get rid of this!"
            onClick={() => handleDislike(restaurant)}
          >
            <Clear color="primary" />
          </IconButton>
          <IconButton
            aria-label="Looks good! Add to my favourites"
            onClick={() => handleLike(restaurant)}
          >
            <FavoriteIcon color="secondary" />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  )
}

export default withStyles(styles)(OneRestaurant)