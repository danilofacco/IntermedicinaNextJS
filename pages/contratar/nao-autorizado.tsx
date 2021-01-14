 
import React from 'react'
import HeaderContratar from '../../components/HeaderContratar'
import Footer from '../../components/Footer'
import HeaderVoltarAzul from '../../components/HeaderVoltarAzul'  
import Image from 'next/image'  


import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';

const NaoAutorizado: React.FC = () => {
    return (
      <>
    <HeaderVoltarAzul/> 
    <HeaderContratar page={4} cor="laranja"/>
    <div className="flex flex-col items-center p-4">
      <Image src="/assets/i_laranja.svg" width={44} height={44}/>
      <span className="montserrat-bold text-laranja mb-6 text-center text-lg">Transação<br/>
      não autorizada</span>
      <span className="text-xs text-center text-gray-500 uppercase">
      Não foi possÍvel realizar o pagamento<br/>
      utilizando os dados informados.<br/><br/>
      <strong>Por favor verifique e tente novamente.</strong>

      </span> 
      
        <button type="button" className="mt-4 mb-2 montserrat-regular text-sm bg-verde justify-between flex items-center w-full text-white  rounded-md p-4"><span><strong>Tentar</strong> Novamente</span> <Image src="/assets/arrowRight.svg" width={19} height={13}/></button>
  
      <Footer/>

      </div>
  
 
    </>   );
};
export default NaoAutorizado;
