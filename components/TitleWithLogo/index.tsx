import React from 'react';
import Image from 'next/image'

import { Container } from './styles';
 

const TitleWithLogo: React.FC  = ({ children, ...rest }) => {
  return (
    <Container  {...rest}>
      <Image
      src="/assets/logo_icon.svg"
      width={20}
      height={24}
      />
      <span>{children}</span>
      <div className="line"></div>
    </Container>
  );
};

export default TitleWithLogo;
