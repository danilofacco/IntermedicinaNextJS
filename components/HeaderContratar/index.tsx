import React from 'react';
import Image from 'next/image'
import Router from 'next/router';
import { withRouter } from 'next/router'

import { Container } from './styles';
import { CenteredText } from '../../pages/contratar/_styles';

interface iHeader{
  page:number;
  cor?:string;
}
 

const HeaderContratar: React.FC<iHeader> = ({ page, cor, children , ...rest }) => {

  function Page({ router }) {
    return <p>{router.pathname}</p>
  }

  return (
    <Container  {...rest}> 
      <Image src ='/assets/logo_intermedicina.svg' width={110} height={17} />
      <div className="bloco"> 
      <div className={`item ${page >= 1 && 'selected'}`}>
        <div className="linha"></div>
        <span>INÍCIO</span>
      </div>

      <div className={`item ${page >= 2 && 'selected'}`}>
        <div className="linha"></div>
        <span>CADASTRO</span>
      </div>

      <div className={`item ${page >= 3 && 'selected'}`}>
        <div className="linha"></div>
        <span>PAGAMENTO</span>
      </div>

      <div className={`item ${page >= 4 && 'selected'} ${cor && cor}`}>
        <div className="linha"></div>
        <span>CONCLUÍDO</span>
      </div>

      </div>  
    </Container>
  );
};

export default HeaderContratar;
