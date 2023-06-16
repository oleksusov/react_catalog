import './CartList.scss';

import React from 'react';
import { CartItem } from '../CartItem';
import { useAppSelector } from '../../helpers/hooks';

export const CartList: React.FC = () => {
  const cartItems = useAppSelector(state => state.cart);

  return (
    <ul className="cart-list">
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
        />
      ))}
    </ul>
  );
};
