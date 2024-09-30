import { memo, useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../components/pagination';
import Loading from '../../components/loading';

function Main() {
  const store = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const catalog = store.actions.catalog;

  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    setLoading(true);
    catalog.load(page, limit).finally(() => setLoading(false));
  }, [searchParams, catalog]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => {
      store.actions.modals.open('basket');
    }, [store]),
  };

  const renders = {
    item: useCallback(
      item => (
        <Item
          item={item}
          onAdd={callbacks.addToBasket}
          linkTo={`/product/${item._id}`}
          linkKey={item._id}
        />
      ),
      [callbacks.addToBasket],
    ),
  };

  const handlePageChange = newPage => {
    setSearchParams({
      limit,
      page: newPage,
    });
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      {loading ? (
        <Loading />
      ) : (
        <>
          <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
          <List list={select.list} renderItem={renders.item} />
          <Pagination currentPage={page} totalPages={10} onPageChange={handlePageChange} />
        </>
      )}
    </PageLayout>
  );
}

export default memo(Main);
