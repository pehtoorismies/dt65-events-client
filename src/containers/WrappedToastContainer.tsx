import React from 'react';
import styled from '@emotion/styled';
import { ToastContainer, ToastContainerProps } from 'react-toastify';
import { colors } from '../theme';

export const WrappedToastContainer = ({ className, ...rest }: ToastContainerProps & { className?: string }) => (
  <div className={className}>
    <ToastContainer {...rest} />
  </div>
);

export default styled(WrappedToastContainer)`
  .Toastify__toast-container {}
  .Toastify__toast {}
  .Toastify__toast--error {
    background-color: ${colors.red};
  }
  .Toastify__toast--warning {
    background-color: ${colors.lightBlue};
  }
  .Toastify__toast--success {
    background-color: ${colors.pink};
  }
  .Toastify__toast-body {}
  .Toastify__progress-bar {}
`;