import React from 'react';

/*
  Input component is an adapter.
  Imagine that in the future we move to react-bootstrap or material-ui
  In this case we only need to replase default input by the library input
*/
const Input = props => (
  <input {...props} />
);

export default Input;
