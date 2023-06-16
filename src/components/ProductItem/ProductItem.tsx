import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks';
import * as cartActions from '../../features/cart';
import * as favoritesActions from '../../features/favorites';
import { Item } from '../../types/Item';
import { Product } from '../../types/Product';

type Props = {
  product: Product,
};

export const ProductItem: React.FC<Props> = ({ product }) => {
  const {
    category,
    image,
    itemId,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = product;

  const cartItems = useAppSelector(state => state.cart);
  const favorites = useAppSelector(state => state.favorites);
  const dispatch = useAppDispatch();
  const addItemToCart = ((item: Item) => (
    dispatch(cartActions.add(item))
  ));

  const removeItemFromCart = ((id: string) => (
    dispatch(cartActions.remove(id))
  ));

  const addItemToFavorites = ((item: Product) => (
    dispatch(favoritesActions.add(item))
  ));

  const removeItemFromFavorites = ((id: string) => (
    dispatch(favoritesActions.remove(id))
  ));

  const handleToggleCartItems = () => {
    if (!cartItems.find((item: Item) => item.id === itemId)) {
      const newItem = {
        id: itemId,
        imageURL: image,
        name,
        price,
        quantity: 1,
      };

      addItemToCart(newItem);
    } else {
      removeItemFromCart(itemId);
    }
  };

  const handleToggleFavorites = () => {
    if (!favorites.find((item: Product) => item.itemId === itemId)) {
      addItemToFavorites(product);
    } else {
      removeItemFromFavorites(itemId);
    }
  };

  const scrollUp = () => {
    document.querySelector('.page')?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <li
      className="product-list__item"
      data-cy="cardsContainer"
    >
      <Link
        to={`/${category}/${itemId}`}
        className="product-list__link"
        onClick={scrollUp}
      >
        <div className="product-list__image-container">
          <img
            className="product-list__image"
            src={`${image}`}
            alt={itemId}
          />
        </div>
      </Link>

      <Link
        to={`/${category}/${itemId}`}
        className="product-list__link"
        onClick={scrollUp}
      >
        <div className="product-list__subtitle">
          {name}
        </div>
      </Link>

      <div className="product-list__price">
        <div className="product-list__price-discount">
          {`$${price}`}
        </div>

        <div className="product-list__price-regular">
          {`$${fullPrice}`}
        </div>
      </div>

      <div className="product-list__info product-list__info--first">
        <span className="product-list__characteristic">
          Screen
        </span>

        <span className="product-list__value">
          {screen}
        </span>

        <span className="product-list__characteristic">
          Capacity
        </span>

        <span className="product-list__value">
          {capacity}
        </span>

        <span className="product-list__characteristic">
          RAM
        </span>

        <span className="product-list__value">
          {ram}
        </span>
      </div>

      <div className="product-list__buttons">
        <button
          type="button"
          className={classNames(
            'product-list__button',
            'button',
            {
              'button--selected': (cartItems.find((item: Item) => item.id === product?.itemId)),
            },
          )}
          onClick={handleToggleCartItems}
        >
          {
            (cartItems.find((item: Item) => item.id === product?.itemId))
              ? 'Added to cart'
              : 'Add to cart'
          }
        </button>

        <button
          aria-label="toggle-favorites"
          type="button"
          className={classNames(
            'product-list__button',
            'button-square',
            {
              'button-square--filled': (favorites.find((item: Product) => item.itemId === itemId)),
            },
            {
              'button-square--like': !(favorites.find((item: Product) => item.itemId === itemId)),
            },
          )}
          data-cy="addToFavorite"
          onClick={handleToggleFavorites}
        />
      </div>

    </li>
  );
};
