import React from 'react';
import { useRouter } from 'next/router'

import { HeaderStyled } from './styles'; 
import { FiChevronLeft } from 'react-icons/fi';

interface iHeaderProps{
  voltar?:string;
}

const HeaderVoltarAzul: React.FC<iHeaderProps> = ({ voltar="",children, ...rest }) => {
  const router = useRouter()
  function handleClick(){
    !voltar ?
      router.back()
    : 
    router.push(voltar)
  }
  return (
    <HeaderStyled {...rest}>
        <a href="#" onClick={handleClick} ><FiChevronLeft size={18}/> VOLTAR</a> 
        {children}
    </HeaderStyled>
  );
};

export default HeaderVoltarAzul;
