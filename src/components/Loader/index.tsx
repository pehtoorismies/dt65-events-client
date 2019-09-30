// import { css } from '@emotion/core';
import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import { colors } from '../../theme';

// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: ${colors.blue};
// `;

const Loader: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ClipLoader
      sizeUnit={'px'}
      size={150}
      color={colors.pink}
      loading={loading}
    />
  );
};

export default Loader;
