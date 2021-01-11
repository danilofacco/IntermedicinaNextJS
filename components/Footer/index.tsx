import React from 'react';

 
import { ImWhatsapp as Whatsapp } from 'react-icons/im';
 

const Footer: React.FC = ({ children, ...rest }) => {
  return (
    <div className="flex flex-col m-5 items-center" {...rest}>
        <a  className="text-cinza   text-xs" href="tel:08007226967"><strong>DÚVIDAS?</strong> LIGUE 0800 722 6967</a>
        <a  className="text-cinza mt-1 text-xs" href="https://bit.ly/359nBXw" target="_blank"><Whatsapp className="text-verde" size={18}/></a>
      {children}
    </div>
  );
};

export default Footer;
