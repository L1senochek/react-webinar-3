import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/pagination';

function Main() {
  const store = useStore();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const catalog = store.actions.catalog;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  useEffect(() => {
    catalog.load(page, limit);
  }, [page, limit, catalog]);

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

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
      navigate('basket');
    }, [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
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
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />

      <Pagination currentPage={page} totalPages={10} onPageChange={handlePageChange} />
    </PageLayout>
  );
}

export default memo(Main);
