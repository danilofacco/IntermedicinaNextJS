import React from 'react';

import { FooterStyled } from './styles';
import { ImWhatsapp as Whatsapp } from 'react-icons/im';
 

const Footer: React.FC = ({ children, ...rest }) => {
  return (
    <FooterStyled {...rest}>
        <a href="tel:08007226967"><strong>DÚVIDAS?</strong> LIGUE 0800 722 6967</a>
        <a href="https://bit.ly/359nBXw" target="_blank"><Whatsapp size={18}/></a>
      {children}
    </FooterStyled>
  );
};

export default Footer;
