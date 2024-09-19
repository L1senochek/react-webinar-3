import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item, buttonFunction = () => {}, buttonLabel }) {
  return (
    <div className={'Item'}>
      <div className="Item-code">{item.code}</div>
      <div className="Item-content">
        <div className="Item-title">{item.title}</div>
        <div className="Item-price">
          {!item.quantity ? item.price : item.price * item.quantity} ₽
        </div>
        {item.quantity && <div className="Item-price">{item.quantity} шт.</div>}
      </div>
      <div className="Item-actions">
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
