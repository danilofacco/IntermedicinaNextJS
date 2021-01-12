import React from 'react';
import Image from 'next/image'  

interface iHeader{
  page:number;
  cor?:string;
} 

const HeaderContratar: React.FC<iHeader> = ({ page, cor, children , ...rest }) => {

  function Page({ router }) {
    return <p>{router.pathname}</p>
  } 

  return (
    <div  className="flex montserrat-regular flex-col justify-between mt-4" {...rest}> 
      <Image src ='/assets/logo_intermedicina.svg' width={110} height={17} />
      <div className="flex p-4"> 

      <div className={`p-1 w-1/4 `}>
        <div className={`linha w-full h-1 bg-quase-branco mb-1 ${page >= 1 && 'bg-verde'}`}></div>
        <span className={`flex items-center text-cinza-claro text-xxs ${page >= 1 && 'text-verde'}`}>INÍCIO</span>
      </div>

      <div className={`p-1 w-1/4 `}>
        <div className={`linha w-full h-1 bg-quase-branco mb-1 ${page >= 2 && 'bg-verde'}`}></div>
        <span className={`flex items-center text-cinza-claro text-xxs ${page >= 2 && 'text-verde'}`} >CADASTRO</span>
      </div>

      <div className={`p-1 w-1/4 `}>
        <div className={`linha w-full h-1 bg-quase-branco mb-1 ${page >= 3 && 'bg-verde'}`}></div>
        <span className={`flex items-center text-cinza-claro text-xxs ${page >= 3 && 'text-verde'}`}>PAGAMENTO</span>
      </div>

      <div className={`p-1 w-1/4 `}>
        <div className={`linha w-full h-1 bg-quase-branco mb-1 ${page >= 4 && 'bg-verde'} ${cor == "azul" && 'bg-azul'} ${cor == "laranja" && 'bg-laranja'}`}></div>
        <span className={`flex items-center text-cinza-claro text-xxs ${page >= 4 && 'text-verde'} ${cor == "azul" && 'text-azul'} ${cor == "laranja" && 'text-laranja'} `} >CONCLUÍDO</span>
      </div>

      </div>  
    </div>
  );
};

export default HeaderContratar;
