import React from 'react';
import { useRouter } from 'next/router'
 
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
    <div className="flex flex-col justify-center bg-azul" {...rest}>
        <a href="#" className="flex py-3 items-center my-x ml-6 montserrat-medium text-white text-xxs" onClick={handleClick} ><FiChevronLeft className="text-white" size={18}/> VOLTAR</a> 
        {children}
    </div>
  );
};

export default HeaderVoltarAzul;
