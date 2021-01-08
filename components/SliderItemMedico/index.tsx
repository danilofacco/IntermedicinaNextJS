import React from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router'
 

interface ButtonProps{
  imagem:string;
  cidades:string[];
  nome:string;
  atuacao:string; 
}

const SliderItemMedico: React.FC<ButtonProps> = ({ imagem,cidades,nome,atuacao, children , ...rest }) => { 
  return (
    <div className="flex flex-col w-full relative" {...rest}> 
       <Image  src={imagem}   alt={nome}   width={600} height={600} />
       
       <div className="flex bottom-0 justify-between w-full px-4 absolute ">
        <div className="flex flex-col text-left ">
            <span className="text-xs text-azul font-bold  uppercase">{nome}</span>
            <span className="text-xs font-bold text-cinza">{atuacao}</span>
        </div>

        <div className="flex flex-col relative -top-6 items-start text-left">
        <Image  src="/assets/mapIcon.svg"  width={12} height={22}/> 
        
            
            {cidades.map(c =>
              <span className=" relative text-xs font-bold text-cinza uppercase">{c}</span>
            )} 
            
        </div>
       </div> 
      
    </div>
  );
};

export default SliderItemMedico;
