import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CategoryService from '../API/CategoryService';
import { Grid, Paper, CircularProgress, Container, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ProductsList = () => {
  const params = useParams();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const products = await CategoryService.getCategoryProducts(params.slug);
      setProducts(products);
      setIsLoading(false);
    };
    fetchProducts();
  }, [params]);

  return (
    <Container maxWidth="xl">
      <Grid mt={2} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {isLoading ? (
          <Box m="auto" mt={10}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          products.map((product) => (
            <Grid key={product.id} item xs={3}>
              <Item>
                <Typography variant="h6">{product.title}</Typography>
              </Item>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default ProductsList;
