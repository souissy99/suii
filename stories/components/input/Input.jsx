import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import './input.css'; 

/**
 * Primary UI component for user interaction
 */
export const Input = ({ label, type, ...props }) => {
  return (
    <TextField color="warning" label={label} type={type} />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
};

Input.defaultProps = {
  label: "",
  type: "text",
};
