import React from 'react';

const ContainerCustom = props => {
  return <div className='border border-dark rounded shadow p-3 mb-3'>{props.children}</div>;
};

export default ContainerCustom;
