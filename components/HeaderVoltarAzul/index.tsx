import React from 'react';
import { useRouter } from 'next/router'

import { HeaderStyled } from './styles'; 
import { FiChevronLeft } from 'react-icons/fi';

const HeaderVoltarAzul: React.FC = ({ children, ...rest }) => {
  const router = useRouter()
  return (
    <HeaderStyled {...rest}>
        <a href="#" onClick={() => router.back()} ><FiChevronLeft size={18}/> VOLTAR</a> 
        {children}
    </HeaderStyled>
  );
};

export default HeaderVoltarAzul;
