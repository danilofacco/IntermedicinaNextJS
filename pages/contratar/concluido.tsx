 
import React, { useRef, useCallback, useEffect } from 'react'
import HeaderContratar from '../../components/HeaderContratar'
import HeaderVoltarAzul from '../../components/HeaderVoltarAzul' 
import {CenteredText, Container,Information, ContratoSelecionado, BoxAssinatura, BoxConcluido} from '../../styles/_styles'
import Image from 'next/image' 

import { ImWhatsapp as Whatsapp } from 'react-icons/im'
import { ContratarStore } from '../../store/contratar'


interface SignInFormData {
  email: string;
  password: string;
}

const Concluido: React.FC = () => {

  useEffect(()=>{
    var Store = JSON.parse(localStorage.getItem('Intermedicina@ContratarStore'))
    Store ? ContratarStore.update(s => Store) : null
  },[])
  
    return (
      <>
    <HeaderVoltarAzul voltar="/contratar/pagamento"/> 
    <HeaderContratar page={4}/>
    <BoxConcluido>
      <Image src="/assets/check_branco_verde.svg" width={32} height={32}/>
      <span className="titulo">Parabéns</span>
      <span className="texto">
      Você já pode marcar<br/>
      suas consultas com <strong>Especialistas</strong>
      </span>

      <button>PORTAL DO CLIENTE</button>

      <a  href="tel:08007226967"><strong>DÚVIDAS? </strong>LIGUE 0800 722 6967</a>
      <a href="https://web.whatsapp.com/send?phone=5527999897838&text=Gostaria%20de%20mais%20informa%C3%A7%C3%B5es!%20Pode%20me%20ajudar?" target="_blank"><Whatsapp size={18}/></a>
      

    </BoxConcluido> 
  
 
    </>   );
};
export default Concluido
