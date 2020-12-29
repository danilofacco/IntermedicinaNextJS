 
import React, { useRef, useCallback } from 'react';

import HeaderContratar from '../../components/HeaderContratar'
import HeaderVoltarAzul from '../../components/HeaderVoltarAzul' 
import { SpinnerCircularFixed } from 'spinners-react';
import {CenteredText, Container,Information, ContratoSelecionado, BoxAssinatura, BoxConcluido} from './_styles'
import Image from 'next/image' 

import { ImWhatsapp as Whatsapp } from 'react-icons/im';

import {ContratarStore} from '../../store/contratar'
 

interface SignInFormData {
  email: string;
  password: string;
}

const ConcluidoPicPay: React.FC = () => {

  const {contratoSelecionadoTitulo} = ContratarStore.useState(s => s);
    return (
      <>
    <HeaderVoltarAzul/> 
    <HeaderContratar page={4} cor="azul"/>
    <BoxConcluido style={{background:"#138FCE"}}>
    <SpinnerCircularFixed size={32} thickness={140} speed={150} color="#fff" secondaryColor="rgba(255, 255, 255, 0.15)" />
      <span className="titulo">Quase lá!</span>
      
      <span className="texto12">AGUARDANDO <br/>CONFIRMAÇÃO DO PICPAY</span>

      <a  href="tel:08007226967"><strong>DÚVIDAS? </strong>LIGUE 0800 722 6967</a>
      <a href="https://web.whatsapp.com/send?phone=5527999897838&text=Gostaria%20de%20mais%20informa%C3%A7%C3%B5es!%20Pode%20me%20ajudar?" target="_blank"><Whatsapp size={18}/></a>
      

    </BoxConcluido> 
  
 
    </>   );
};
export default ConcluidoPicPay;
