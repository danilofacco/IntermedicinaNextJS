import React from 'react';
import Image from 'next/image'
import Router from 'next/router';
import { withRouter } from 'next/router'

import { Container } from './styles';
import { CenteredText } from '../../styles/_styles';

interface iHeader{
  page:number;
  cor?:string;
}
 

const HeaderContratar: React.FC<iHeader> = ({ page, cor, children , ...rest }) => {

  function Page({ router }) {
    return <p>{router.pathname}</p>
  } 

  return (
    <Container  className="flex flex-col justify-between mt-4" {...rest}> 
      <Image src ='/assets/logo_intermedicina.svg' width={110} height={17} />
      <div className="flex p-4"> 

      <div className={`p-1 w-1/4 ${page >= 1 && 'selected'}`}>
        <div className="linha w-full h-1 bg-quase-branco mb-1"></div>
        <span className="flex items-center text-cinza-claro text-xs">INÍCIO</span>
      </div>

      <div className={`p-1 w-1/4 ${page >= 2 && 'selected'}`}>
        <div className="linha w-full h-1 bg-quase-branco mb-1"></div>
        <span className="flex items-center text-cinza-claro text-xs" >CADASTRO</span>
      </div>

      <div className={`p-1 w-1/4 ${page >= 3 && 'selected'}`}>
        <div className="linha w-full h-1 bg-quase-branco mb-1"></div>
        <span className="flex items-center text-cinza-claro text-xs" >PAGAMENTO</span>
      </div>

      <div className={`p-1 w-1/4 ${page >= 4 && 'selected'} ${cor && cor}`}>
        <div className="linha w-full h-1 bg-quase-branco mb-1"></div>
        <span className="flex items-center text-cinza-claro text-xs" >CONCLUÍDO</span>
      </div>

      </div>  
    </Container>
  );
};

export default HeaderContratar;
