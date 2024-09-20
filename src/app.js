import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartModal from './components/cart-modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isCartOpen, setCartOpen] = useState(false);
  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onAddToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),

    onRemoveFromCart: useCallback(
      code => {
        store.removeFromCart(code);
      },
      [store],
    ),

    toggleCart: useCallback(() => {
      setCartOpen(prev => !prev);
    }, []),
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        onAdd={callbacks.toggleCart}
        titleButton={'Перейти'}
        titleLabel={
          <>
            В корзине:
            <strong>
              {!totalItems && !totalPrice ? ' пусто' : ` ${totalItems} товара / ${totalPrice} ₽`}
            </strong>
          </>
        }
      />
      <List list={list} buttonFunction={callbacks.onAddToCart} buttonLabel={'Добавить'} />
      {isCartOpen && (
        <CartModal
          cart={cart}
          onRemoveFromCart={callbacks.onRemoveFromCart}
          onClose={callbacks.toggleCart}
        />
      )}
    </PageLayout>
  );
}

export default App;
