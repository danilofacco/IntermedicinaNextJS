import React from 'react';
import Image from 'next/image'  

interface ButtonProps{
  imagem:string; 
  titulo:string;
  descricao:string; 
}

const SliderItemLocal: React.FC<ButtonProps> = ({ imagem,titulo,descricao, children , ...rest }) => { 
  return (
    <div className="flex flex-col w-full relative" {...rest}> 
       <Image  src={imagem}   alt={titulo}   width={600} height={600} />
       
       <div className="flex bottom-0 justify-between w-full px-4 absolute ">
        <div className="w-full flex flex-col text-center  items-center "> 
            <Image  src="/assets/mapIcon.svg"  width={12} height={22}/>              
            <span className="w-full text-xs text-azul montserrat-bold  uppercase">{titulo}</span>
            <span className="w-32 text-xs montserrat-bold text-cinza text-center"  >{descricao}</span>
        </div>

        
       </div> 
      
    </div>
  );
};

export default SliderItemLocal;
