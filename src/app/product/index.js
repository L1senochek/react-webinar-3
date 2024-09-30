import { useNavigate, useParams } from 'react-router-dom';
import { memo, useCallback, useEffect, useState } from 'react';
import Loading from '../../components/loading';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';
import BasketTool from '../../components/basket-tool';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProductPage() {
  const [product, setProduct] = useState(null);
  const store = useStore();
  const { id } = useParams();
  const cn = bem('ProductPage');

  useEffect(() => {
    fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`)
      .then(response => response.json())
      .then(data => setProduct(data.result));
  }, [id]);

  const select = useSelector(state => ({
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

  if (!product) return <Loading />;

  return (
    <PageLayout>
      <Head title={product.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <div className={cn('description')}>
        <p className={cn('item')}>{product.description}</p>
        <p className={cn('item')}>
          Страна производитель:
          <span className={cn('bold')}>
            {product.madeIn.title} ({product.madeIn.code})
          </span>
        </p>
        <p className={cn('item')}>
          Категория:<span className={cn('bold')}>{product.category.title}</span>
        </p>
        <p className={cn('item')}>
          Год выпуска:<span className={cn('bold')}>{product.edition}</span>
        </p>
        <p className={cn('item', { price: true })}>
          Цена:<span className={cn('bold')}>{product.price} ₽</span>
        </p>
        <button onClick={() => callbacks.addToBasket(product._id)}>Добавить</button>
      </div>
    </PageLayout>
  );
}

export default memo(ProductPage);
