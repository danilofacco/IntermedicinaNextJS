import React, { AnchorHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const AOutlineButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      {children}
    </Container>
  );
};

export default AOutlineButton;
