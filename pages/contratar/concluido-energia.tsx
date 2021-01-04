 
import React, { useRef, useCallback, useEffect } from 'react'; 
import HeaderContratar from '../../components/HeaderContratar'
import Footer from '../../components/Footer'
import HeaderVoltarAzul from '../../components/HeaderVoltarAzul' 
import {CenteredText, Container,Information, ContratoSelecionado, BoxAssinatura, BoxConcluido} from '../../styles/_styles'
import Image from 'next/image'  


import { ImWhatsapp as Whatsapp } from 'react-icons/im';

import {ContratarStore} from '../../store/contratar'
 

interface SignInFormData {
  email: string;
  password: string;
}

const ConcluidoEnergia: React.FC = () => {

  

  const ContratarStoreRead = ContratarStore.useState(s => s);

  useEffect(()=>{
    var Store = JSON.parse(localStorage.getItem('Intermedicina@ContratarStore'))
    Store ? ContratarStore.update(s => Store) : null
  },[])


    return (
      <>
    <HeaderVoltarAzul voltar="/contratar/pagamento"/> 
    <HeaderContratar page={4} cor="azul"/>
    <BoxConcluido style={{background:"#138FCE"}}>
      <Image src="/assets/check_branco_azul.svg" width={32} height={32}/>
      <span className="titulo">Quase lá!</span>
      <span className="subtitulo">Recebemos sua Assinatura</span>
      <span className="texto12">A Intermedicina entrará em contato por telefone, para formalizar a <strong>AUTORIZAÇÃO DE DÉBITO</strong> em seu talão de energia, conforme exigência das concessionárias elétricas.
      </span>

      <a  href="tel:08007226967"><strong>DÚVIDAS? </strong>LIGUE 0800 722 6967</a>
      <a href="https://bit.ly/359nBXw" target="_blank"><Whatsapp size={18}/></a>
    

    </BoxConcluido> 
  
 
    </>   );
};
export default ConcluidoEnergia;
