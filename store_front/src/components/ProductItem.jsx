import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Card, CardActionArea, CardMedia, CardContent, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  cardItem: {
    background: 'linear-gradient(45deg, #fafafa 30%, #fcfcfc 90%)',
    boxShadow: '0 3px 5px 2px rgba(0, 48, 73, .3)',
  },
  responsiveText: {
    fontSize: '0.8rem',
    '@media (min-width:600px)': {
      fontSize: '1.2rem',
    },
  },
}));

const ProductItem = ({ product }) => {
  const classes = useStyles();
  return (
    <Grid
      xs={3}
      component={Link}
      to={`/products/${product.slug}`}
      sx={{ textDecoration: 'none' }}
      item
    >
      <Card sx={{ maxWidth: 345 }} className={classes.cardItem}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="auto"
            image={product.images[0].image}
            alt={product.images[0].alt_text}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              className={classes.responsiveText}
            >
              {product.title}
            </Typography>
            <Box
              component="p"
              className={classes.responsiveText}
              sx={{ fontWeight: 900 }}
            >
              ${product.regular_price}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ProductItem;
