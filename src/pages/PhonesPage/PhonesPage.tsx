import './PhonesPage.scss';

import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductList } from '../../components/ProductList';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { getSortedProducts } from '../../helpers/getSortedProducts';
import { Pagination } from '../../components/Pagination';
import { Picker } from '../../components/Picker';

type Props = {
  phones: Product[],
};

export const PhonesPage: React.FC<Props> = ({ phones }) => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || phones.length;
  const start = currentPage * perPage - perPage;
  const end = Math.min(currentPage * perPage, phones.length);
  const sortBy = searchParams.get('sortBy');
  const sortValues = ['Newest', 'Alphabetically', 'Price'];
  const itemsPageValues = ['4', '8', '16', 'All'];

  const sortedProducts: Product[] = useMemo(() => (
    getSortedProducts(
      phones,
      sortBy,
    )
  ), [phones, sortBy]);

  const visibleProducts = sortedProducts.slice(start, end);

  return (
    <>
      <section className="page__section phones-page">
        <div className="phones-page__container">
          <div className="phones-page__navigate">
            <Breadcrumbs />
          </div>

          <h1 className="phones-page__title">
            Mobile phones
          </h1>

          <div className="phones-page__description">
            {`${phones.length} models`}
          </div>

          <div className="phones-page__content">
            <div className="phones-page__pickers">
              <div className="phones-page__picker">
                <Picker
                  options={sortValues}
                  label="Sort by"
                  startValue="Choose an option"
                  searchParamsKey="sortBy"
                />
              </div>

              <div className="phones-page__picker">
                <Picker
                  options={itemsPageValues}
                  label="Items on page"
                  startValue="All"
                  searchParamsKey="perPage"
                />
              </div>
            </div>

            <div className="phones-page__product-list">
              <ProductList
                products={visibleProducts}
                data-cy="productList"
              />
            </div>

            {(perPage < phones.length) && (
              <div className="phones-page__pagination">
                <Pagination
                  total={phones.length}
                  perPage={perPage}
                  currentPage={currentPage}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
