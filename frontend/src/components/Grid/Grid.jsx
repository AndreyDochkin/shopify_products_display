import './Grid.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/productsSlice';
import Card from '../Card/Card';
import Preloader from '../Preloader/Preloader';

const Grid = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
 
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <Preloader />;
  
  return (
    <div className="products-grid">
      {items.map((product) => (
         <Card key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Grid;
