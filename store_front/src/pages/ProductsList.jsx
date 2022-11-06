import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import CategoryService from '../API/CategoryService';
import {
  CircularProgress,
  Container,
  Box,
  Grid
} from '@mui/material';
import ProductItem from '../components/ProductItem';

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
          products.map((product) => <ProductItem key={product.title} product={product} />)
        )}
      </Grid>
    </Container>
  );
};

export default ProductsList;
