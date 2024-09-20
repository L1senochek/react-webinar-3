import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Controls({ onAdd = () => {}, titleButton, titleLabel }) {
  const cn = bem('Controls');
  return (
    <div className={cn()}>
      <div className={cn('title')}>{titleLabel}</div>
      {onAdd && titleButton && <button onClick={() => onAdd()}>{titleButton}</button>}
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  titleButton: PropTypes.node,
  titleLabel: PropTypes.node,
};

export default React.memo(Controls);
