import './ProductList.scss';

import React from 'react';
import { Product } from '../../types/Product';
import { ProductItem } from '../ProductItem';

type Props = {
  products: Product[],
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <ul
      className="product-list"
      data-cy="productList"
    >
      {products.map(product => (
        <ProductItem
          key={product.itemId}
          product={product}
        />
      ))}
    </ul>
  );
};
