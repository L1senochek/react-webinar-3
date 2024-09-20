import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item({ item, buttonFunction = () => {}, buttonLabel }) {
  const cn = bem('Item');
  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('content')}>
        <div className={cn('title')}>{item.title}</div>
        <div className={cn('info')}>
          <div className={cn('price')}>
            {!item.quantity ? item.price : item.price * item.quantity} ₽
          </div>
          {item.quantity && <div className={cn('quantity')}>{item.quantity} шт.</div>}
        </div>
      </div>
      <div className={cn('actions')}>
        <button onClick={() => buttonFunction(item.code)}>{buttonLabel}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  buttonFunction: PropTypes.func,
  buttonLabel: PropTypes.node,
};

export default React.memo(Item);
