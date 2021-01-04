 
import React, { useRef, useCallback, useEffect } from 'react'
import HeaderContratar from '../../components/HeaderContratar'
import Footer from '../../components/Footer'
import HeaderVoltarAzul from '../../components/HeaderVoltarAzul' 
import {CenteredText, Container,Information, ContratoSelecionado, BoxAssinatura, BoxConcluido} from '../../styles/_styles'
import Image from 'next/image' 
import { ContratarStore } from '../../store/contratar'

interface SignInFormData {
  email: string;
  password: string;
}

 

const NaoAutorizado: React.FC = () => {
    return (
      <>
    <HeaderVoltarAzul/> 
    <HeaderContratar page={4} cor="laranja"/>
    <Container>
      <Image src="/assets/i_laranja.svg" width={44} height={44}/>
      <span className="naoAutorizado">Transação<br/>
      não autorizada</span>
      <span className="texto">
      Não foi possÍvel realizar o pagamento<br/>
      utilizando os dados informados.<br/><br/>
      <strong>Por favor verifique e tente novamente.</strong>

      </span>
 

        <button type="button" className="button"><span><strong>Tentar</strong> Novamente</span> <Image src="/assets/arrowRight.svg" width={19} height={13}/></button>
 
        <br/><br/>
      <Footer/>

      </Container>
  
 
    </>   );
};
export default NaoAutorizado;
