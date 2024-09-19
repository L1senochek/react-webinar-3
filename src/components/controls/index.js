import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ onAdd = () => {}, titleButton, titleLabel }) {
  return (
    <div className="Controls">
      <div>{titleLabel}</div>
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
