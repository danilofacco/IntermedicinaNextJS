 
import React, {   useEffect } from 'react';

import HeaderContratar from '../../components/HeaderContratar'
import HeaderVoltarAzul from '../../components/HeaderVoltarAzul' 
import { SpinnerCircularFixed } from 'spinners-react'; 

import { ImWhatsapp as Whatsapp } from 'react-icons/im';

import {ContratarStore} from '../../store/contratar'
 
 
const ConcluidoPicPay: React.FC = () => {

  const {contratoSelecionadoTitulo} = ContratarStore.useState(s => s);
  
  useEffect(()=>{
    var Store = JSON.parse(localStorage.getItem('Intermedicina@ContratarStore'))
    Store ? ContratarStore.update(s => Store) : null
  },[])

    return (
      <>
    <HeaderVoltarAzul voltar="/contratar/pagamento"/> 
    <HeaderContratar page={4} cor="azul"/>
    <div className="bg-azul flex w-full h-screen text-white montserrat-regular flex-col pt-8 items-center text-center">
    <SpinnerCircularFixed size={32} thickness={140} speed={150} color="#fff" secondaryColor="rgba(255, 255, 255, 0.15)" />
      
    <span className="text-lg mt-2 montserrat-bold">Quase lá!</span>
      
      <span className="text-xs my-6  mx-8 text-center">AGUARDANDO <br/>CONFIRMAÇÃO DO PICPAY</span>

      <a className="text-xs mb-2 text-center" href="tel:08007226967"><strong>DÚVIDAS? </strong>LIGUE 0800 722 6967</a>
      <a href="https://bit.ly/359nBXw" target="_blank"><Whatsapp size={18}/></a>
      

    </div> 
  
 
    </>   );
};
export default ConcluidoPicPay;
