import React from 'react';
import Image from 'next/image'  

interface ButtonProps{
  imagem:string;
  cidades:string[];
  nome:string;
  atuacao:string; 
}

const SliderItemMedico: React.FC<ButtonProps> = ({ imagem,cidades,nome,atuacao, children , ...rest }) => { 
  return (
    <div className="flex flex-col -mb-2  w-full relative" {...rest}> 
     
      <Image  src={imagem}   alt={nome}  width={500} height={500} layout="responsive"/> 
     
      
       <div className="flex bottom-0 justify-between w-full px-4  absolute ">
        <div className="flex flex-col text-left "> 
            <span className="text-xxs text-azul montserrat-bold  uppercase">{nome}</span>
            <span className="text-xxs montserrat-bold text-cinza">{atuacao}</span>
        </div>

        <div className="flex flex-col relative -top-6 items-start text-left">
        <Image  src="/assets/mapIcon.svg"  width={12} height={22}/> 
        
            
            {cidades.map(c =>
              <span key={c} className=" relative text-xxs montserrat-bold text-cinza uppercase">{c}</span>
            )} 
            
        </div>
       </div> 
      
    </div>
  );
};

export default SliderItemMedico;
