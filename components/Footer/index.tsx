import React from 'react';

import { FooterStyled } from './styles';
import { ImWhatsapp as Whatsapp } from 'react-icons/im';
 

const Footer: React.FC = ({ children, ...rest }) => {
  return (
    <FooterStyled {...rest}>
        <a href="tel:08007226967"><strong>DÚVIDAS?</strong> LIGUE 0800 722 6967</a>
        <a href="https://web.whatsapp.com/send?phone=5527999897838&text=Gostaria%20de%20mais%20informa%C3%A7%C3%B5es!%20Pode%20me%20ajudar?" target="_blank"><Whatsapp size={18}/></a>
      {children}
    </FooterStyled>
  );
};

export default Footer;
