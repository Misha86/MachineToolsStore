import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../API/ProductService';
 


const ProductDetails = () => {
  const params = useParams();

  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const product = await ProductService.getProduct(params.slug);
      console.log(product)
      setProduct(product);
      setIsLoading(false);
    };
    fetchProducts();
  }, [params]);

  return (
    <div>
      <h1>{product.title}</h1>
      {/* <h1>{product}</h1> */}
    </div>
  );
};

export default ProductDetails;