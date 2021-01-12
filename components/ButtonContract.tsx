import React from 'react'; 
import { useRouter } from 'next/router'
import Image from "next/image"
import {ContratarStore} from '../store/contratar'

interface ButtonProps{
  title:string;
  subtitle:string;
  price:string;
  oldPrice:string;
  link:string;
  description:string; 
  featured?:boolean;
  id:string;
  code:number;
}

const ButtonContract: React.FC<ButtonProps> = ({ code,id,title,subtitle,price,oldPrice,link,description,featured=false, children , ...rest }) => {
  const router = useRouter() 

  function SelecionarContrato(id,title,price,code,link){

    ContratarStore.update(s => {
      s.contratoSelecionado = id;
      s.CodigoTipoContrato = code;
      s.LinkPoliticaDePrivacidade = link;
      s.contratoSelecionadoTitulo = title;
      s.precoContrato = price;
    })
 

    router.push('/contratar/inicio')
 }
 
  return (
    <div 
    className="flex justify-between bg-cinza bg-opacity-5 w-full border border-cinza border-opacity-20 rounded-md mt-4" 
    onClick={()=>SelecionarContrato(id,title,price,code,link)}
    {...rest} > 
      <div  className="flex flex-col p-4 items-between justify-between h-full text-left gap-1"> 
        <div className="flex items-center">
          {children}
          <span className="text-lg montserrat-bold text-azul ml-1">{title}</span>
        </div>

        <span className="text-xs montserrat-medium  text-cinza">{subtitle}</span>
        <span className="text-xs  montserrat-medium text-cinza">{description}</span> 
      </div>
      
      <div className="flex flex-col items-start p-4 relative gap-0.5">

       {featured ? 
       <div className="absolute z-2 -mt-7 -ml-1  ">
       <Image src="/assets/recomendado.svg" width={102} height={21} />
       </div>
           
         :""} 

        {/*featured ? 
       <strong className="absolute z-1 -mt-7 left-0.5 bg-laranja rounded-sm px-1 py-0.5 text-center text-bold text-white text-xxs  ">
           O MAIS COMPLETO!
        </strong> :"" */} 

        <span className="text-xs montserrat-medium text-azul">R$</span>
        <div>
          <span className="text-xl montserrat-bold text-azul">
            {price}
          </span>
          <span className="text-sm montserrat-bold text-azul">
              ,00
          </span>
          <span className="text-xs montserrat-medium text-azul">
              /mês
            </span>
        </div>
        <span className="text-xs montserrat-medium line-through text-center text-cinza">
          R$ {oldPrice}
        </span>
        <a className="bg-verde cursor-pointer rounded-sm text-xs montserrat-bold text-center text-white px-4 py-2" >
          ASSINAR
        </a>
      </div>
    </div>
  );
};

export default ButtonContract;
