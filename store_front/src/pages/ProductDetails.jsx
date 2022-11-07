import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../API/ProductService';
import { Container, Box, Grid, Typography, Card, CardMedia, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Carousel from 'react-material-ui-carousel';

const useStyles = makeStyles((theme) => ({
  responsiveText: {
    fontSize: '0.8rem',
    '@media (min-width:600px)': {
      fontSize: '1.2rem',
    },
  },
}));

const ProductDetails = () => {
  const params = useParams();
  const classes = useStyles();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const product = await ProductService.getProduct(params.slug);
      setProduct(product);
      setIsLoading(false);
    };
    fetchProducts();
  }, [params]);

  return (
    <Container maxWidth="xl">
      {isLoading ? (
        <Box m="auto" mt={10}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Grid
          container
          mt={2}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          direction="row"
        >
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 350 }}>
              <Carousel autoPlay={false}>
                {product.images.map((image) => (
                  <CardMedia
                    key={image.image}
                    component="img"
                    image={image.image}
                    alt={image.alt_text}
                  />
                ))}
              </Carousel>
            </Card>
          </Grid>
          <Grid container item xs={12} sm={6} md={8}>
            <Grid rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className={classes.responsiveText}
              >
                {product.title}
              </Typography>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                className={classes.responsiveText}
              >
                {product.description}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item justifyContent="center" direction="row">
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className={classes.responsiveText}
            >
              Specification
            </Typography>
          </Grid>
          {product.specification_values.map((obj) => (
            <Grid container item key={obj.specification}>
              <Grid item xs={9} sm={6} md={6}>
                <Typography
                  gutterBottom
                  variant="button"
                  component="div"
                  className={classes.responsiveText}
                >
                  {obj.specification}
                </Typography>
              </Grid>
              <Grid item xs={3} sm={6} md={6}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  className={classes.responsiveText}
                >
                  {obj.value}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ProductDetails;
