import React from 'react';
import PropTypes from 'prop-types';

/**
 * Primary UI component for user interaction
 */
export const Button = ({ label, size, ...props }) => {
  return (
    <button
        type="button"
        className={['p-button', `p-button--${size}`, 'p-button-primary']}
        {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  size: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  size: 'medium',
  onClick: undefined,
};
